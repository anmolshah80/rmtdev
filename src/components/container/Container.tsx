import JobItemContent from '@/components/container/JobItemContent';
import Sidebar from '@/components/container/Sidebar';

const Container = () => {
  return (
    <div className="container">
      <Sidebar />

      <JobItemContent />
    </div>
  );
};

export default Container;
