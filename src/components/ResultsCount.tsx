type ResultsCountProps = {
  totalJobItems: number;
};

const ResultsCount = ({ totalJobItems }: ResultsCountProps) => {
  return (
    <p className="count">
      <span className="u-bold">{totalJobItems}</span> results
    </p>
  );
};

export default ResultsCount;
