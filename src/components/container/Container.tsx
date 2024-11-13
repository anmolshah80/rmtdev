import JobItemContent from '@/components/container/JobItemContent';
import Sidebar from '@/components/container/Sidebar';

import { TJobItem, TPageDirection, TSortBy } from '@/lib/types';

type ContainerProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string | undefined;
  totalJobItems: number;
  currentPage: number;
  totalNumberOfPages: number;
  sortBy: TSortBy;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

const Container = ({
  jobItems,
  loading,
  errorMessage,
  totalJobItems,
  currentPage,
  totalNumberOfPages,
  sortBy,
  handleChangePage,
  handleChangeSortBy,
}: ContainerProps) => {
  return (
    <div className="container">
      <Sidebar
        jobItems={jobItems}
        loading={loading}
        errorMessage={errorMessage}
        totalJobItems={totalJobItems}
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        sortBy={sortBy}
        handleChangePage={handleChangePage}
        handleChangeSortBy={handleChangeSortBy}
      />

      <JobItemContent />
    </div>
  );
};

export default Container;
