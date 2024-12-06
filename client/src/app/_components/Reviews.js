'use client';

import { useState } from 'react';
import useUser from '../_hooks/useUser';
import useProduct from '../_hooks/useProduct';
import useReviewList from '../_hooks/useReviewList';
import RatingBar from './RatingBar';
import ReviewImageList from './ReviewImageList';
import NewReviewForm from './NewReviewForm';
import ReviewCard from './ReviewCard';
import ReviewPagination from './ReviewPagination';
import ReviewPopover from './ReviewPopover';
import styles from '@/app/_styles/Reviews.module.css';

export default function Reviews({ productId }) {
   const [ reviewsPerPage, setReviewsPerPage ] = useState(5);
   const [ currPage, setCurrPage ] = useState(1);
   const [ reviewPopoverInfo, setReviewPopoverInfo ] = useState({
      show: false, reviewIndex: undefined, imageIndex: undefined 
   });

   const { user } = useUser();
   const { product, error: productError, mutate: productMutate } = useProduct(productId, 'all');
   const { reviewList, error: reviewListError, mutate: reviewListMutate } = 
      useReviewList(productId, 'true');

   if (productError || reviewListError) {
      console.error(productError);
      console.error(reviewListError);

      return null;
   }

   if (reviewList) {
      var currReviewList = reviewList.data.slice(
         reviewsPerPage * (currPage - 1), reviewsPerPage * currPage
      );
   }

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
      (product && reviewList) &&
         <article className={styles['reviews']}>
            <h2 id='reviews'>Reviews</h2>
            <div className={styles['rating-count-ctnr']}>
               <RatingBar reviewCount={product.data.reviewCount} ratingSum={product.data.ratingSum} 
                  context={'reviews'} 
               />
               <p>({product.data.reviewCount})</p>
            </div>
            <ReviewImageList reviewList={reviewList} toggleReviewPopover={toggleReviewPopover} />

            {
               (user && user.data) &&
                  <NewReviewForm product={product} revalidateProduct={productMutate}
                     revalidateReviewList={reviewListMutate} 
                  />
            }

            <ReviewPagination reviewList={reviewList} 
               reviewsPerPage={reviewsPerPage} setReviewsPerPage={setReviewsPerPage}
               currPage={currPage} setCurrPage={setCurrPage}
            />

            {
               currReviewList.length > 0
                  ? 
                     <ul className={styles['reviews-list']}>
                        {
                           currReviewList.map((review, index) => {
                              //calculate index relative to original reviewList,
                              //  not currReviewList
                              const reviewIndex = index + (reviewsPerPage * (currPage - 1));

                              return (
                                 <li key={review.id}>
                                    <ReviewCard product={product} 
                                       reviewList={reviewList} 
                                       review={review} reviewIndex={reviewIndex}
                                       toggleReviewPopover={toggleReviewPopover}
                                       revalidateProduct={productMutate}
                                       revalidateReviewList={reviewListMutate} 
                                    />
                                 </li>
                              );
                           })
                        }
                     </ul>
                  : 
                     <p className={styles['no-reviews-msg']}>No reviews yet - be the first to leave a review!</p>
            }

            <ReviewPagination reviewList={reviewList}
               reviewsPerPage={reviewsPerPage} setReviewsPerPage={setReviewsPerPage}
               currPage={currPage} setCurrPage={setCurrPage}
            />

            {
               reviewPopoverInfo.show &&
                  <ReviewPopover 
                     productName={product.data.name} 
                     reviewList={reviewList} 
                     reviewIndex={reviewPopoverInfo.reviewIndex}
                     imageIndex={reviewPopoverInfo.imageIndex}
                     toggleReviewPopover={toggleReviewPopover}
                     updateReviewPopover={updateReviewPopover}
                  />
            }
         </article>
   );
};