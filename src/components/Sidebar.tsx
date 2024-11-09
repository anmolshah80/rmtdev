import ResultsCount from '@/components/ResultsCount';
import SortingControls from '@/components/SortingControls';
import JobList from '@/components/JobList';
import PaginationControls from '@/components/PaginationControls';

import { TJobItem } from '@/lib/types';

type SidebarProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string;
  totalJobItems: number;
};

const Sidebar = ({
  jobItems,
  loading,
  errorMessage,
  totalJobItems,
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalJobItems={totalJobItems} />
        <SortingControls />
      </div>

      <JobList
        loading={loading}
        errorMessage={errorMessage}
        jobItems={jobItems}
      />
      <PaginationControls />
    </div>
  );
};

export default Sidebar;
