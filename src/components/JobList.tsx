import JobListItem from '@/components/JobListItem';
import Spinner from '@/components/Spinner';

import { TJobItem } from '@/lib/types';

type JobListProps = {
  jobItems: TJobItem[];
  loading: boolean;
  errorMessage: string;
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
        <p className="error-message">Error: {errorMessage}</p>
      </ul>
    );
  }

  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => {
        return <JobListItem key={jobItem.id} jobItem={jobItem} />;
      })}
    </ul>
  );
};

export default JobList;
