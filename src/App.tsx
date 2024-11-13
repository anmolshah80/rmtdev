import { useMemo, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Background from '@/components/Background';
import Container from '@/components/container/Container';
import Footer from '@/components/Footer';
import Header from '@/components/header/Header';

import { useDebounce, useJobItems } from '@/lib/hooks';
import { TPageDirection, TSortBy } from '@/lib/types';
import { JOB_RESULTS_PER_PAGE } from '@/lib/constants';

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>('relevant');

  const { loading, errorMessage, jobItems } = useJobItems(debouncedSearchText);

  // sort method mutates the original jobItems array and returns a reference to the same array so to prevent that we are spreading the jobItems in a new array and mutating that instead
  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === 'relevant') {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * JOB_RESULTS_PER_PAGE - JOB_RESULTS_PER_PAGE,
    currentPage * JOB_RESULTS_PER_PAGE,
  );

  const totalJobItems = jobItems?.length || 0;
  const totalNumberOfPages = totalJobItems / 7;

  const handleChangePage = (direction: TPageDirection) => {
    if (direction === 'next') {
      setCurrentPage((previousValue) => previousValue + 1);
    } else if (direction === 'previous') {
      setCurrentPage((previousValue) => previousValue - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: TSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container
        loading={loading}
        errorMessage={errorMessage}
        jobItems={jobItemsSortedAndSliced}
        totalJobItems={totalJobItems}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        sortBy={sortBy}
        handleChangePage={handleChangePage}
        handleChangeSortBy={handleChangeSortBy}
      />

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
