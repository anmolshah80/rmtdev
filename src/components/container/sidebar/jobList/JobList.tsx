import JobListItem from '@/components/container/sidebar/jobList/JobListItem';
import Spinner from '@/components/Spinner';

import { useActiveJobIdContext, useLocationHash } from '@/lib/hooks';
import { TJobItem } from '@/lib/types';

type JobListProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage?: string;
};

const JobList = ({ jobItems, loading, errorMessage }: JobListProps) => {
  const { isUrlHashEmpty } = useLocationHash();

  const { activeJobId } = useActiveJobIdContext();

  if (loading) {
    return (
      <ul className="job-list">
        <Spinner />
      </ul>
    );
  }

  if (errorMessage) {
    return (
      <ul className="job-list">
        <p className="error-message">{errorMessage}</p>
      </ul>
    );
  }

  if (jobItems.length === 0 && isUrlHashEmpty) return null;

  if (jobItems.length === 0)
    return (
      <p className="job-items-empty">
        Try searching for any technology your ideal job is working with
      </p>
    );

  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          isActive={activeJobId === jobItem.id}
        />
      ))}
    </ul>
  );
};

export default JobList;
