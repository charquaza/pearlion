'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/_styles/ReviewImageList.module.css';

export default function ReviewImageList({ review }) {
   //remove check after normalizing database: review.images should be
   // set to empty array if no images
   if (!review.images) {
      return null;
   }

   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 6] ])
   );

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

   function handleSlideClick(e) {
      //let index = e.currentTarget.getAttribute('data-index');
   }

   return (
      <div className={styles['review-image-list-container']}>
         {
            review.images.length > slideshow.get('count') &&
               <button id='previous-slide' disabled={slideshow.get('startIndex') === 0}
                  onClick={handleSlideshowToggle}
               > &lt; </button>
         }

         <ul className={styles['image-list']}>
            {
               review.images.map((image, index) => {
                  if (
                     index < slideshow.get('startIndex') || 
                     index >= slideshow.get('startIndex') + slideshow.get('count')
                  ) {
                     return null;
                  } else {
                     return (
                        <li 
                           key={index}
                           data-index={index}
                           onClick={handleSlideClick}
                        >
                           <Image
                              src={image}
                              alt='image from customer review'
                              quality={100}
                              sizes='50vw'
                           />
                        </li>
                     );
                  }
               })
            } 
         </ul>

         {
            review.images.length > slideshow.get('count') &&
               <button 
                  id='next-slide' 
                  disabled={
                     slideshow.get('startIndex') + slideshow.get('count') 
                        >= review.images.length
                  }
                  onClick={handleSlideshowToggle}
               > &gt; </button>
         }
      </div>
   );
};