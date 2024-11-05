import ResultsCount from '@/components/ResultsCount';
import SortingControls from '@/components/SortingControls';
import JobList from '@/components/JobList';
import PaginationControls from '@/components/PaginationControls';

import { TJobItem } from '@/lib/types';

type SidebarProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string;
};

const Sidebar = ({ jobItems, loading, errorMessage }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
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
