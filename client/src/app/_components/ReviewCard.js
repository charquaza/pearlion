import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import styles from '@/app/_styles/ReviewCard.module.css';

export default function ReviewCard({ productName, review, reviewIndex, toggleReviewPopover }) {
   return (
      <article className={styles['review']}>
         <h3>{review.client}</h3>
         <p>{review.date}</p>
         <p>Product Reviewed: {productName}</p>
         <RatingBar reviewCount={1} ratingSum={review.rating} context='review-card' />
         <ReviewImageList review={review} 
            reviewIndex={reviewIndex}
            toggleReviewPopover={toggleReviewPopover}
         />
         <p>{review.review}</p>
      </article>
   );
};