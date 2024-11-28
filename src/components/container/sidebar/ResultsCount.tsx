import { useJobItemsContext } from '@/lib/hooks';

const ResultsCount = () => {
  const { totalJobItems } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalJobItems}</span> results
    </p>
  );
};

export default ResultsCount;
