import { useState, useEffect } from 'react';

import { TJobItem } from '@/lib/types';
import { BASE_URL } from '@/lib/constants';
import { handleErrorStatuses } from '@/lib/handleErrors';

const useJobItems = (searchText: string) => {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText || searchText.length < 3) return;

    const fetchData = async () => {
      setLoading(true);
      setErrorMessage('');

      const searchUrl = `${BASE_URL}?search=${searchText}`;

      try {
        const response = await fetch(searchUrl);

        if (response.ok) {
          const data = await response.json();

          setJobItems(data.jobItems);

          console.log('data: ', data);
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

  return [loading, errorMessage, jobItemsSliced] as const;
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

  return {
    activeJobID,
  };
};

export { useJobItems, useActiveJobID };
