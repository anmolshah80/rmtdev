import JobItemContent from '@/components/JobItemContent';
import Sidebar from '@/components/Sidebar';

import { TJobItem } from '@/lib/types';

type ContainerProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string;
};

const Container = ({ jobItems, loading, errorMessage }: ContainerProps) => {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        loading={loading}
        errorMessage={errorMessage}
      />
      <JobItemContent />
    </div>
  );
};

export default Container;
