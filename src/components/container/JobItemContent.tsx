import BookmarkIcon from '@/components/BookmarkIcon';
import Spinner from '@/components/Spinner';

import { useActiveJobIdContext, useJobItem } from '@/lib/hooks';

const EmptyJobContent = () => {
  return (
    <section className="job-details">
      <div className="job-details__container">
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
};

const JobItemContent = () => {
  const { activeJobId } = useActiveJobIdContext();

  const [isJobItemLoading, jobItemErrorMessage, jobItem] =
    useJobItem(activeJobId);

  if (isJobItemLoading)
    return (
      <section className="job-details">
        <Spinner />
      </section>
    );

  if (jobItemErrorMessage)
    return (
      <section className="job-details">
        <p className="error-message">{jobItemErrorMessage}</p>
      </section>
    );

  if (!jobItem) return <EmptyJobContent />;

  const {
    id,
    description,
    title,
    companyURL,
    coverImgURL,
    location,
    salary,
    duration,
    qualifications,
    reviews,
    badgeLetters,
    company,
  } = jobItem;

  return (
    <section className="job-details">
      <div className="job-details__container">
        <img src={coverImgURL} alt="Office view" />

        <a className="apply-btn" href={companyURL} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">2d</time>

              <BookmarkIcon jobID={id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{title}</h2>
            <p className="job-info__company">{company}</p>
            <p className="job-info__description">{description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{' '}
                {location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {qualifications.map((qualification: string) => (
                <li key={qualification + id} className="qualifications__item">
                  {qualification}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {reviews.map((review: string) => (
                <li key={review + id} className="reviews__item">
                  {review}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{' '}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </section>
  );
};

export default JobItemContent;
