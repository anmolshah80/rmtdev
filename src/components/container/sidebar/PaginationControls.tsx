import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { useJobItemsContext } from '@/lib/hooks';

const PaginationControls = () => {
  const { currentPage, totalNumberOfPages, handleChangePage } =
    useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <button
          className={'pagination__button pagination__button--previous'}
          onClick={(event) => {
            handleChangePage('previous');
            event.currentTarget.blur();
          }}
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </button>
      )}

      {currentPage < totalNumberOfPages && (
        <button
          className={'pagination__button pagination__button--next'}
          onClick={(event) => {
            handleChangePage('next');
            event.currentTarget.blur();
          }}
        >
          Page {currentPage + 1}
          <ArrowRightIcon />
        </button>
      )}
    </section>
  );
};

export default PaginationControls;
