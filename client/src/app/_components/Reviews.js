'use client';

import { useState } from 'react';
import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import NewReviewForm from './NewReviewForm';
import ReviewCard from './ReviewCard';
import ReviewPagination from './ReviewPagination';
import ReviewPopover from './ReviewPopover';
import styles from '@/app/_styles/Reviews.module.css';

export default function Reviews({ product }) {
   const [ reviewsPerPage, setReviewsPerPage ] = useState(5);
   const [ currPage, setCurrPage ] = useState(1);
   const [ reviewPopoverInfo, setReviewPopoverInfo ] = useState({
      show: false, reviewIndex: undefined, imageIndex: undefined 
   });

   const currReviewList = product.reviews.slice(
      reviewsPerPage * (currPage - 1), reviewsPerPage * currPage
   );

   function toggleReviewPopover(reviewIndex, imageIndex) {
      setReviewPopoverInfo(prev => { 
         document.body.style.overflow = prev.show ? '' : 'hidden';
         document.body.ariaDisabled = prev.show ? null : 'true';
         
         return { show: !prev.show, reviewIndex, imageIndex }
      });
   }

   function updateReviewPopover(newReviewIndex) {
      setReviewPopoverInfo({ show: true, reviewIndex: newReviewIndex, imageIndex: 0 });
   }

   return (
      <article className={styles['reviews']}>
         <h2 id='reviews'>Reviews</h2>
         <RatingBar reviews={product.reviews} context={'reviews'} />
         
         <ReviewImageList product={product} toggleReviewPopover={toggleReviewPopover} />

         <NewReviewForm product={product} />

         <ReviewPagination product={product} 
            reviewsPerPage={reviewsPerPage} setReviewsPerPage={setReviewsPerPage}
            currPage={currPage} setCurrPage={setCurrPage}
         />

         {
            currReviewList.length > 0
               ? 
                  <ul className={styles['reviews-list']}>
                     {
                        currReviewList.map((review, index) => {
                           return (
                              //after linking database, replace key with review.id
                              <li key={index}>
                                 <ReviewCard product={product} review={review} 
                                    reviewIndex={index}
                                    toggleReviewPopover={toggleReviewPopover}
                                 />
                              </li>
                           );
                        })
                     }
                  </ul>
               : 
                  <p className={styles['no-reviews-msg']}>No reviews yet - be the first to leave a review!</p>
         }

         <ReviewPagination product={product} 
            reviewsPerPage={reviewsPerPage} setReviewsPerPage={setReviewsPerPage}
            currPage={currPage} setCurrPage={setCurrPage}
         />

         {
            reviewPopoverInfo.show &&
               <ReviewPopover 
                  product={product} 
                  review={product.reviews[reviewPopoverInfo.reviewIndex]} 
                  reviewIndex={reviewPopoverInfo.reviewIndex}
                  imageIndex={reviewPopoverInfo.imageIndex}
                  toggleReviewPopover={toggleReviewPopover}
                  updateReviewPopover={updateReviewPopover}
               />
         }
      </article>
   );
};