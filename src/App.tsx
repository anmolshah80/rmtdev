import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Background from '@/components/Background';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { useDebounce, useJobItems } from '@/lib/hooks';

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const { loading, errorMessage, jobItems } = useJobItems(debouncedSearchText);

  const jobItemsSliced = jobItems?.slice(0, 7) || [];
  const totalJobItems = jobItems?.length || 0;

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container
        loading={loading}
        errorMessage={errorMessage}
        jobItems={jobItemsSliced}
        totalJobItems={totalJobItems}
      />

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
