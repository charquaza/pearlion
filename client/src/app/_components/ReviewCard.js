'use client';

import { useState } from 'react';
import { DateTime } from 'luxon';
import useUser from '../_hooks/useUser';
import { apiURL } from '@/root/config';
import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import styles from '@/app/_styles/ReviewCard.module.css';

export default function ReviewCard({ 
   productName, review, reviewIndex, toggleReviewPopover,
   revalidateProduct, revalidateReviewList 
}) {
   const [ deleteError, setDeleteError ] = useState(false);
   const { user } = useUser();

   async function handleDeleteReview(e) {
      try {
         const fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         }
         const fetchURL = apiURL + '/reviews/' + review.id;
   
         const res = await fetch(fetchURL, fetchOptions);

         if (res.ok) {
            setDeleteError(false);
            revalidateProduct();
            revalidateReviewList();
         } else {
            const data = await res.json();
            console.error(data.errors);
            setDeleteError(true);
         }
      } catch (e) {
         console.error(e);
         setDeleteError(true);
      }
   }

   return (
      <article className={styles['review']}>
         {(user && user.data) && 
            (user.data.id === review.client || user.data.privilege === 'admin') 
            && 
               <>
                  <button onClick={handleDeleteReview}>Delete</button>

                  {deleteError &&
                     <p className={styles['error-messages']}>
                        Review could not be deleted at this time; please try again later
                     </p>
                  }
               </>
         }

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