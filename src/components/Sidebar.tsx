import ResultsCount from '@/components/ResultsCount';
import SortingControls from '@/components/SortingControls';
import JobList from '@/components/JobList';
import PaginationControls from '@/components/PaginationControls';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>

      <JobList />
      <PaginationControls />
    </div>
  );
};

export default Sidebar;
