import { Toaster } from 'react-hot-toast';

import Background from '@/components/Background';
import Container from '@/components/container/Container';
import Footer from '@/components/Footer';
import Header from '@/components/header/Header';

function App() {
  return (
    <>
      <Background />

      <Header />

      <Container />

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
