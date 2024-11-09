import { useState } from 'react';

import Background from '@/components/Background';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { useDebounce, useJobItems } from '@/lib/hooks';

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const {
    loading,
    errorMessage,
    jobItemsSliced: jobItems,
    totalJobItems,
  } = useJobItems(debouncedSearchText);

  return (
    <>
      <Background />

      <Header searchText={searchText} setSearchText={setSearchText} />

      <Container
        loading={loading}
        errorMessage={errorMessage}
        jobItems={jobItems}
        totalJobItems={totalJobItems}
      />

      <Footer />
    </>
  );
}

export default App;
