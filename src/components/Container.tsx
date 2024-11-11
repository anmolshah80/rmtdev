import JobItemContent from '@/components/JobItemContent';
import Sidebar from '@/components/Sidebar';

import { TJobItem } from '@/lib/types';

type ContainerProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string | undefined;
  totalJobItems: number;
};

const Container = ({
  jobItems,
  loading,
  errorMessage,
  totalJobItems,
}: ContainerProps) => {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        loading={loading}
        errorMessage={errorMessage}
        totalJobItems={totalJobItems}
      />
      <JobItemContent />
    </div>
  );
};

export default Container;
