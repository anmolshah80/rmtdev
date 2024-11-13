import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { TPageDirection } from '@/lib/types';

type PaginationControlsProps = {
  currentPage: number;
  totalNumberOfPages: number;
  handleChangePage: (direction: TPageDirection) => void;
};

const PaginationControls = ({
  currentPage,
  totalNumberOfPages,
  handleChangePage,
}: PaginationControlsProps) => {
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
