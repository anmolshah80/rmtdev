import ResultsCount from '@/components/container/sidebar/ResultsCount';
import SortingControls from '@/components/container/sidebar/SortingControls';
import JobList from '@/components/container/sidebar/JobList';
import PaginationControls from '@/components/container/sidebar/PaginationControls';

import { TPageDirection, TJobItem, TSortBy } from '@/lib/types';

type SidebarProps = {
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

const Sidebar = ({
  jobItems,
  loading,
  errorMessage,
  totalJobItems,
  currentPage,
  totalNumberOfPages,
  sortBy,
  handleChangePage,
  handleChangeSortBy,
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalJobItems={totalJobItems} />
        <SortingControls
          sortBy={sortBy}
          handleChangeSortBy={handleChangeSortBy}
        />
      </div>

      <JobList
        loading={loading}
        errorMessage={errorMessage}
        jobItems={jobItems}
      />
      <PaginationControls
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default Sidebar;
