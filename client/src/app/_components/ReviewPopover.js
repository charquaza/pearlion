'use client';

import { useEffect } from 'react';
import RatingBar from './RatingBar';
import ProductImageList from './ProductImageList';
import styles from '@/app/_styles/ReviewPopover.module.css';

export default function ReviewPopover({ 
   productName, reviewList, reviewIndex, imageIndex, 
   toggleReviewPopover, updateReviewPopover
}) {
   let currReview = reviewList.data[reviewIndex];

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

         while (newReviewIndex < reviewList.data.length) {
            if (reviewList.data[newReviewIndex].Images.length > 0) {
               updateReviewPopover(newReviewIndex);
               break;
            }
            newReviewIndex++;
         }
      } else {
         var newReviewIndex = reviewIndex - 1;

         while (newReviewIndex >= 0) {
            if (reviewList.data[newReviewIndex].Images.length > 0) {
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
            onClick={handleReviewToggle} disabled={
               (reviewIndex <= 0) ||
               (reviewList.data[reviewIndex - 1].Images.length === 0)
            }
         >
            &lt;
         </button>

         <div className={styles['main-popover']}>
            <ProductImageList review={currReview} imageIndex={imageIndex} 
               key={currReview.id}
            />

            <article className={styles['review']}>
               <h3>{currReview.User.firstName + ' ' + currReview.User.lastName}</h3>
               <RatingBar reviewCount={1} ratingSum={currReview.rating} context='review-card' />
               <p>{currReview.date}</p>
               <p>Product Reviewed: {productName}</p>
               <p>{currReview.review}</p>
            </article>

            <button
               className={styles['close-btn']}
               onClick={toggleReviewPopover}
            >
               &#x2715;
            </button>
         </div>

         <button className={styles['next-review-btn']} data-id='next' 
            onClick={handleReviewToggle} disabled={
               (reviewIndex >= reviewList.data.length - 1) ||
               (reviewList.data[reviewIndex + 1].Images.length === 0)
            }
         >
            &gt;
         </button>
      </div>
   );
};