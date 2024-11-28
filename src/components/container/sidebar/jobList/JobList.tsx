import JobListItem from '@/components/container/sidebar/jobList/JobListItem';
import Spinner from '@/components/Spinner';

import { useActiveJobIdContext } from '@/lib/hooks';
import { TJobItem } from '@/lib/types';

type JobListProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage?: string;
};

const JobList = ({ jobItems, loading, errorMessage }: JobListProps) => {
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

  const { activeJobId } = useActiveJobIdContext();

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
