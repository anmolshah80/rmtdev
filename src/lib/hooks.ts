import { useState, useEffect } from 'react';

import { TJobItem, TJobItemExpanded } from '@/lib/types';
import { BASE_URL, DEFAULT_TIMEOUT } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const jobItemsSliced = jobItems.slice(0, 7);
  const totalJobItems = jobItems.length;

  useEffect(() => {
    const trimmedSearchText = searchText.trim();

    if (!trimmedSearchText || trimmedSearchText.length < 3) return;

    const fetchData = async () => {
      setLoading(true);
      setErrorMessage('');

      const searchUrl = `${BASE_URL}?search=${searchText}`;

      try {
        const response = await fetch(searchUrl);

        if (response.ok) {
          const data = await response.json();

          setJobItems(data.jobItems);
        } else {
          const { status } = response;

          handleErrorStatuses(status);
        }

        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);

          console.error(error.message);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [searchText]);

  return { loading, errorMessage, jobItemsSliced, totalJobItems };
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

const useJobItem = (jobID: number | null) => {
  const [isJobItemLoading, setIsJobItemLoading] = useState(false);
  const [jobItemErrorMessage, setJobItemErrorMessage] = useState('');
  const [jobItem, setJobItem] = useState<TJobItemExpanded | null>(null);

  useEffect(() => {
    if (!jobID) return;

    const fetchSingleJobItem = async () => {
      setIsJobItemLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/${jobID}`);

        if (response.ok) {
          const data = await response.json();

          setJobItem(data.jobItem);

          setIsJobItemLoading(false);
        } else {
          const { status } = response;

          handleErrorStatuses(status);
        }
      } catch (error) {
        if (error instanceof Error) {
          setJobItemErrorMessage(error.message);
        }

        setIsJobItemLoading(false);
      }
    };

    fetchSingleJobItem();
  }, [jobID]);

  if (!jobID) {
    return [false, '', null] as const;
  }

  return [isJobItemLoading, jobItemErrorMessage, jobItem] as const;
};

const useDebounce = <T>(value: T, timeout = DEFAULT_TIMEOUT): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), timeout);

    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};

export { useJobItems, useActiveJobID, useJobItem, useDebounce };
