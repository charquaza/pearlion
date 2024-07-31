import ReviewImageList from './ReviewImageList';
import styles from '@/app/_styles/ReviewCard.module.css';

export default function ReviewCard({ product, review, reviewIndex, toggleReviewPopover }) {
   return (
      <article className={styles['review']}>
         <h3>{review.client}</h3>
         <p>{review.date}</p>
         <p>Product Reviewed: {product.name}</p>
         <ReviewImageList review={review} 
            reviewIndex={reviewIndex}
            toggleReviewPopover={toggleReviewPopover}
         />
         <p>{review.review}</p>
      </article>
   );
};