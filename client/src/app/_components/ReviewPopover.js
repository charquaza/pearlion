'use client';

import { useEffect } from 'react';
import ProductImageList from './ProductImageList';
import styles from '@/app/_styles/ReviewPopover.module.css';

export default function ReviewPopover({ 
   product, review, reviewIndex, imageIndex, 
   toggleReviewPopover, updateReviewPopover
}) {
   useEffect(() => {
      //in the future - revise tab/focus behavior
      // 1. correct tab/shift+tab behavior
      // 2. no shift in popover background when focus moves to/from body
      // 3. text within popover can be highlighted

      const mainPopover = document.querySelector('.' + styles['main-popover']);
      const firstInteractiveOfPopover = mainPopover.querySelector('button');
      mainPopover.tabIndex = '0';

      function redirectFocusToPopover(e) {
         if (!mainPopover.contains(e.target) /* || mainPopover === e.target */) {
            firstInteractiveOfPopover.focus();
         }
      }

      document.body.addEventListener('focusin', redirectFocusToPopover);

      return () => {
         document.body.removeEventListener('focusin', redirectFocusToPopover);
      };
   }, []);

   function handleReviewToggle(e) {
      var action = e.target.getAttribute('data-id');
      
      if (action === 'next') {
         var newReviewIndex = reviewIndex + 1;

         while (newReviewIndex < product.reviews.length) {
            //after normalizing database: check array size, not existence 
            // review.images will be set to empty array if no images
            if (product.reviews[newReviewIndex].images) {
               updateReviewPopover(newReviewIndex);
               break;
            }
            newReviewIndex++;
         }
      } else {
         var newReviewIndex = reviewIndex - 1;

         while (newReviewIndex >= 0) {
            //after normalizing database: check array size, not existence 
            // review.images will be set to empty array if no images
            if (product.reviews[newReviewIndex].images) {
               updateReviewPopover(newReviewIndex);
               break;
            }
            newReviewIndex--;
         }
      }
   }

   return (
      <div className={styles['review-popover']}>
         <button className={styles['prev-review-btn']} data-id='prev' 
            onClick={handleReviewToggle} disabled={reviewIndex <= 0}
         >
            &lt;
         </button>

         <div className={styles['main-popover']}>
            <ProductImageList product={product} review={review} imageIndex={imageIndex} 
               key={Math.random()} //replace key with review.id after setting up database
            />

            <article className={styles['review']}>
               <h3>{review.client}</h3>
               <p>{review.date}</p>
               <p>Product Reviewed: {product.name}</p>
               <p>{review.review}</p>
            </article>

            <button
               className={styles['close-btn']}
               onClick={toggleReviewPopover}
            >
               &#x2715;
            </button>
         </div>

         <button className={styles['next-review-btn']} data-id='next' 
            onClick={handleReviewToggle} disabled={reviewIndex >= product.reviews.length - 1}
         >
            &gt;
         </button>
      </div>
   );
};