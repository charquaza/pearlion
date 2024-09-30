import ReviewImageList from './ReviewImageList';
import styles from '@/app/_styles/ReviewCard.module.css';

export default function ReviewCard({ productName, review, reviewIndex, toggleReviewPopover }) {
   return (
      <article className={styles['review']}>
         <h3>{review.client}</h3>
         <p>{review.date}</p>
         <p>Product Reviewed: {productName}</p>
         <ReviewImageList review={review} 
            reviewIndex={reviewIndex}
            toggleReviewPopover={toggleReviewPopover}
         />
         <p>{review.review}</p>
      </article>
   );
};