import { DateTime } from 'luxon';
import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import styles from '@/app/_styles/ReviewCard.module.css';

export default function ReviewCard({ productName, review, reviewIndex, toggleReviewPopover }) {
   return (
      <article className={styles['review']}>
         <h3>{review.User.firstName + ' ' + review.User.lastName}</h3>
         <RatingBar reviewCount={1} ratingSum={review.rating} context='review-card' />
         <p>{DateTime.fromISO(review.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
         <p>Product Reviewed: {productName}</p>
         <ReviewImageList review={review} 
            reviewIndex={reviewIndex}
            toggleReviewPopover={toggleReviewPopover}
         />
         <p className={styles['review-text-body']}>{review.review}</p>
      </article>
   );
};