import BookmarkIcon from '@/components/BookmarkIcon';

import { TJobItem } from '@/lib/types';

type JobListItemProps = {
  jobItem: TJobItem;
  isActive: boolean;
};

const JobListItem = ({ jobItem, isActive }: JobListItemProps) => {
  const { id, badgeLetters, company, daysAgo, title } = jobItem;

  const listItemClassName = isActive ? 'job-item job-item--active' : 'job-item';

  return (
    <li className={listItemClassName}>
      <a href={`#${id.toString()}`} className="job-item__link">
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
};

export default JobListItem;
