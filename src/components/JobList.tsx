import JobListItem from '@/components/JobListItem';
import Spinner from '@/components/Spinner';

import { useActiveJobID } from '@/lib/hooks';
import { TJobItem } from '@/lib/types';

type JobListProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string | undefined;
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

  const activeJobID = useActiveJobID();

  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          isActive={activeJobID === jobItem.id}
        />
      ))}
    </ul>
  );
};

export default JobList;
