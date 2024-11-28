import { useJobItemsContext } from '@/lib/hooks';

const SortingControls = () => {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();

  const relevantButtonClassName = `sorting__button sorting__button--relevant ${
    sortBy === 'relevant' ? 'sorting__button--active' : ''
  }`;

  const recentButtonClassName = `sorting__button sorting__button--recent ${
    sortBy === 'recent' ? 'sorting__button--active' : ''
  }`;

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={relevantButtonClassName}
        onClick={() => handleChangeSortBy('relevant')}
      >
        Relevant
      </button>

      <button
        className={recentButtonClassName}
        onClick={() => handleChangeSortBy('recent')}
      >
        Recent
      </button>
    </section>
  );
};

export default SortingControls;
