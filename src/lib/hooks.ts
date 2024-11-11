import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TJobItem, TJobItemExpanded } from '@/lib/types';
import { BASE_URL, DEFAULT_TIMEOUT } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

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

const useJobItems = (searchText: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['job-items', searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText),
  });

  return {
    loading: isLoading,
    errorMessage: error?.message,
    jobItems: data?.jobItems,
  } as const;
};

const useActiveJobID = () => {
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

const fetchJobItem = async (jobID: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_URL}/${jobID}`);

  if (!response.ok) {
    const { status } = response;

    handleErrorStatuses(status);
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

export { useJobItems, useActiveJobID, useJobItem, useDebounce };
