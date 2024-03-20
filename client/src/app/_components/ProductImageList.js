'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/_styles/ProductImageList.module.css';

export default function ProductImageList({ product }) {
   const [ currImageIndex, setCurrImageIndex ] = useState(0);
   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 4] ])
   );

   function handleImageToggle(e) {
      setCurrImageIndex(prev => {
         let currIndex = e.target.id === 'previous-img'
            ? prev - 1 
            : prev + 1;

         //make sure selected image is visible in slideshow
         if (currIndex < slideshow.get('startIndex')) {
            let diff = slideshow.get('startIndex') - currIndex;
            setSlideshow(new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') - diff] ]));
         } else if (currIndex >= slideshow.get('startIndex') + slideshow.get('count')) {
            let diff = currIndex - slideshow.get('startIndex') - slideshow.get('count') + 1;
            setSlideshow(new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') + diff] ]));
         }

         return currIndex;
      });
   }

   function handleSlideshowToggle(e) {
      if (e.target.id === 'previous-slide') {
         setSlideshow(new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') - 1] ]));
      } else if (e.target.id === 'next-slide') {
         setSlideshow(new Map([ ...slideshow, ['startIndex', slideshow.get('startIndex') + 1] ]));
      }
   }

   function handleSlideClick(e) {
      let index = e.currentTarget.getAttribute('data-index');
      if (index) {
         setCurrImageIndex(Number(index));
      }
   }

   return (
      <div className={styles['product-image-list-container']}>
         <div className={styles['curr-image-controls-container']}>
            <button id='previous-img' disabled={currImageIndex === 0}
               onClick={handleImageToggle}
            > &lt; </button>
            <div className={styles['curr-image-container']}>
               <Image
                  src={product.images[currImageIndex]}
                  alt={product.name}
                  quality={100}
                  sizes='50vw'
                  priority={true}
               />
            </div>
            <button id='next-img' disabled={currImageIndex === product.images.length - 1}
               onClick={handleImageToggle}
            > &gt; </button>
         </div>

         <div className={styles['slideshow-container']}>
            {
               product.images.length > slideshow.get('count') &&
                  <button id='previous-slide' disabled={slideshow.get('startIndex') === 0}
                     onClick={handleSlideshowToggle}
                  > &lt; </button>
            }

            <ul className={styles['image-list']}>
               {
                  product.images.map((image, index) => {
                     if (
                        index < slideshow.get('startIndex') || 
                        index >= slideshow.get('startIndex') + slideshow.get('count')
                     ) {
                        return null;
                     } else {
                        return (
                           <li 
                              key={index}
                              className={ (index === currImageIndex) 
                                 ? styles['selected-image-container'] : null
                              }
                              data-index={index}
                              onClick={handleSlideClick}
                           >
                              <Image
                                 src={image}
                                 alt={product.name}
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
               product.images.length > slideshow.get('count') &&
                  <button id='next-slide' disabled={slideshow.get('startIndex') + slideshow.get('count') >= product.images.length}
                     onClick={handleSlideshowToggle}
                  > &gt; </button>
            }
         </div>
      </div>
   );
};