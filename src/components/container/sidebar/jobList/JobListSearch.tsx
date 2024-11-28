import JobList from '@/components/container/sidebar/jobList/JobList';

import { useJobItemsContext } from '@/lib/hooks';

const JobListSearch = () => {
  const { jobItemsSortedAndSliced, loading, errorMessage } =
    useJobItemsContext();

  return (
    <JobList
      loading={loading}
      errorMessage={errorMessage}
      jobItems={jobItemsSortedAndSliced}
    />
  );
};

export default JobListSearch;
