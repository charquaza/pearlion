'use client';

import { useState } from 'react';
import { DateTime } from 'luxon';
import useUser from '../_hooks/useUser';
import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import EditReviewForm from './EditReviewForm';
import styles from '@/app/_styles/ReviewCard.module.css';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function ReviewCard({ 
   product, reviewList, review, reviewIndex, 
   toggleReviewPopover, revalidateProduct, revalidateReviewList 
}) {
   const [ inEditMode, setInEditMode ] = useState(false);
   const [ deleteError, setDeleteError ] = useState(false);
   const { user } = useUser();

   function toggleEditMode(e) {
      setInEditMode(prev => !prev);
   }

   async function handleDeleteReview(e) {
      try {
         const fetchOptions = {
            method: 'DELETE',
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
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
      inEditMode
         ?
            <EditReviewForm
               review={review} product={product}
               reviewList={reviewList} reviewIndex={reviewIndex}
               toggleEditMode={toggleEditMode} 
               revalidateProduct={revalidateProduct}
               revalidateReviewList={revalidateReviewList}
            />
         :
            <article className={styles['review']}>
               <>
                  {
                     (user && user.data) && 
                     (user.data.id === review.client || user.data.privilege === 'admin') && 
                     deleteError &&
                        <p className={styles['error-messages']}>
                           Review could not be deleted at this time; please try again later
                        </p>
                  }

                  <div className={styles['username-buttons-ctnr']}>
                     <h3>{review.User.firstName + ' ' + review.User.lastName}</h3>
                     {
                        (user && user.data) && 
                        (user.data.id === review.client || user.data.privilege === 'admin') && 
                           <div className={styles['edit-buttons-ctnr']}>
                              <button onClick={toggleEditMode}>Edit</button>
                              <button onClick={handleDeleteReview}>Delete</button>
                           </div>
                     }
                  </div>

                  <RatingBar reviewCount={1} ratingSum={review.rating} context='review-card' />
                  <p>{DateTime.fromISO(review.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
                  <p>Product Reviewed: <span className={styles['product-name']}>{product.data.name}</span></p>
                  <ReviewImageList review={review} 
                     reviewIndex={reviewIndex}
                     toggleReviewPopover={toggleReviewPopover}
                  />
                  <p className={styles['review-text-body']}>{review.review}</p>   
               </>
            </article>
   );
};