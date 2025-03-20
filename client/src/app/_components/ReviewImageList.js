'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/ReviewImageList.module.css';

export default function ReviewImageList({ reviewList, review, reviewIndex, toggleReviewPopover }) {
   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 6] ])
   );

   var imageList = useMemo(() => {
      return reviewList
         ? 
            reviewList.data.flatMap((review, reviewIndex) => {
               return review.Images.map((imgData, imageIndex) => {
                  return { imgURL: imgData.url, reviewIndex, imageIndex };
               });
            })
         :
            review.Images.map((imgData, imageIndex) => {
               return { imgURL: imgData.url, reviewIndex, imageIndex };
            });     
   }, [reviewList, review, reviewIndex]);
   
   function handleSlideshowToggle(e) {
      if (e.target.id === 'previous-slide') {
         setSlideshow(
            new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') - 1] ])
         );
      } else if (e.target.id === 'next-slide') {
         setSlideshow(
            new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') + 1] ])
         );
      }
   }

   function handleImageClick(e) {
      var index = e.currentTarget.getAttribute('data-index');
      var imageDetails = imageList[index];

      toggleReviewPopover(imageDetails.reviewIndex, imageDetails.imageIndex);
   }

   return (
      imageList.length > 0 &&
         <div className={styles['review-image-list-container'] 
            + (reviewList ? ' ' + styles['all-reviews'] : '')}
         >
            {
               imageList.length > slideshow.get('count') &&
                  <button id='previous-slide' disabled={slideshow.get('startIndex') === 0}
                     onClick={handleSlideshowToggle}
                  > &lt; </button>
            }

            <ul className={styles['image-list']}>
               {
                  imageList.map((imageDetails, index) => {
                     if (
                        index < slideshow.get('startIndex') || 
                        index >= slideshow.get('startIndex') + slideshow.get('count')
                     ) {
                        return null;
                     } 

                     return (
                        <li 
                           key={index}
                           data-index={index}
                           onClick={handleImageClick}
                        >
                           <Image
                              src={imageDetails.imgURL}
                              placeholder={prodImgPlaceholder}
                              alt='image from customer review'
                              fill={true}
                              quality={100}
                              sizes='50vw'
                           />
                        </li>
                     );
                  })
               } 
            </ul>

            {
               imageList.length > slideshow.get('count') &&
                  <button 
                     id='next-slide' 
                     disabled={
                        slideshow.get('startIndex') + slideshow.get('count') 
                           >= imageList.length
                     }
                     onClick={handleSlideshowToggle}
                  > &gt; </button>
            }
         </div>
   );
};