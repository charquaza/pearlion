'use client';

import { useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewPagination from './ReviewPagination';
import styles from '@/app/_styles/Reviews.module.css';

export default function Reviews({ product }) {
   const [ reviewsPerPage, setReviewsPerPage ] = useState(5);
   const [ currPage, setCurrPage ] = useState(1);

   var currReviewList = product.reviews.slice(
      reviewsPerPage * (currPage - 1), reviewsPerPage * currPage
   );

   return (
      <article className={styles['reviews']}>
         <h2 id='reviews'>Reviews</h2>
         <p>☆☆☆☆☆</p>
         <p>(--insert review image list here--)</p>

         <button>Add a Review</button>

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
                                 <ReviewCard product={product} review={review} />
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
      </article>
   );
};