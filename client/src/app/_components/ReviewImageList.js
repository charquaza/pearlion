'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/_styles/ReviewImageList.module.css';

export default function ReviewImageList({ product, review, reviewIndex, toggleReviewPopover }) {
   //remove check after normalizing database: review.images should be
   // set to empty array if no images
   if (review && !review.images) {
      return null;
   }

   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 6] ])
   );

   //remove ternary expression and simply return review.images
   // once database is normalized
   // also - imageList should be a state variable
   var imageList = product 
      ? 
         product.reviews.flatMap((review, reviewIndex) => {
            return !review.images 
               ? []
               : 
                  review.images.map((image, imageIndex) => {
                     return { image, reviewIndex, imageIndex };
                  });
         })
      : 
         review.images.map((image, imageIndex) => {
            return { image, reviewIndex, imageIndex };
         });
   
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
            + (product ? ' ' + styles['all-reviews'] : '')}
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
                              src={imageDetails.image}
                              alt='image from customer review'
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