import { useState, useEffect, useContext } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { TJobItem, TJobItemExpanded } from '@/lib/types';
import { BASE_URL, DEFAULT_TIMEOUT } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

import { BookmarksContext } from '@/contexts/BookmarksContextProvider';
import { ActiveJobIdContext } from '@/contexts/ActiveJobIdContextProvider';
import { SearchTextContext } from '@/contexts/SearchTextContextProvider';
import { JobItemsContext } from '@/contexts/JobItemsContextProvider';

type JobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemExpanded;
};

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

const fetchJobItems = async (
  searchText: string,
): Promise<JobItemsApiResponse> => {
  const searchUrl = `${BASE_URL}?search=${searchText}`;

  const response = await fetch(searchUrl);

  if (!response.ok) {
    const { status } = response;

    handleErrorStatuses(status);
  }

  const data = await response.json();

  return data;
};

const useSearchQuery = (searchText: string) => {
  const trimmedSearchText = searchText.trim();

  const { data, isLoading, error } = useQuery({
    queryKey: ['job-items', trimmedSearchText],
    queryFn: () => fetchJobItems(trimmedSearchText),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(trimmedSearchText),
  });

  return {
    loading: isLoading,
    errorMessage: error?.message,
    jobItems: data?.jobItems,
  } as const;
};

const useActiveJobId = () => {
  const [activeJobID, setActiveJobID] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const jobID = +window.location.hash.slice(1);

      setActiveJobID(jobID);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return activeJobID;
};

const useDebounce = <T>(value: T, timeout = DEFAULT_TIMEOUT): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), timeout);

    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};

const fetchJobItem = async (
  jobID: number,
  isSuccessiveFetchRequest = false,
): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${jobID}`);

  if (!response.ok) {
    const { status } = response;

    if (!isSuccessiveFetchRequest) {
      handleErrorStatuses(status);
    }

    const errorMessage = `Error Status Code: ${status}. Failed to fetch bookmarked Job details with ID: ${jobID}.`;

    toast.error(errorMessage, {
      duration: 8000,
    });
  }

  const data = await response.json();

  return data;
};

const useJobItem = (jobID: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['job-item', jobID],
    queryFn: () => (jobID ? fetchJobItem(jobID) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(jobID),
  });

  const jobItem = data?.jobItem;
  const errorMessage = error?.message;

  return [isLoading, errorMessage, jobItem] as const;
};

const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      'useBookmarksContext must be used within a BookmarksContextProvider. Ensure that the BookmarksContextProvider is wrapping the App component.',
    );
  }

  return context;
};

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);

    const parsedJson = JSON.parse(localData || JSON.stringify(initialValue));

    return parsedJson;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};

const useJobItems = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id, true),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    })),
  });

  const loading = results.some((result) => result.isLoading);

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  return {
    loading,
    jobItems,
  } as const;
};

const useOnClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, handler]);
};

const useActiveJobIdContext = () => {
  const context = useContext(ActiveJobIdContext);

  if (!context) {
    throw new Error(
      'useActiveJobIdContext must be used within a ActiveJobIdContextProvider. Ensure that the ActiveJobIdContextProvider is wrapping that component.',
    );
  }

  return context;
};

const useSearchTextContext = () => {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error(
      'useSearchTextContext must be used within a SearchTextContextProvider. Ensure that the SearchTextContextProvider is wrapping that component.',
    );
  }

  return context;
};

const useJobItemsContext = () => {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      'useJobItemsContext must be used within a JobItemsContextProvider. Ensure that the JobItemsContextProvider is wrapping that component.',
    );
  }

  return context;
};

export {
  useSearchQuery,
  useActiveJobId,
  useJobItem,
  useDebounce,
  useBookmarksContext,
  useLocalStorage,
  useJobItems,
  useOnClickOutside,
  useActiveJobIdContext,
  useSearchTextContext,
  useJobItemsContext,
};
