import ResultsCount from '@/components/container/sidebar/ResultsCount';
import SortingControls from '@/components/container/sidebar/SortingControls';
import PaginationControls from '@/components/container/sidebar/PaginationControls';
import JobListSearch from '@/components/container/sidebar/jobList/JobListSearch';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>

      <JobListSearch />

      <PaginationControls />
    </div>
  );
};

export default Sidebar;
