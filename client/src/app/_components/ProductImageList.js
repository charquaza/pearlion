'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/ProductImageList.module.css';

export default function ProductImageList({ product, review, imageIndex }) {
   const imageList = useMemo(() => {
      let images = review ? review.Images : product.Images;

      return images.map(imgData => {
         let imgBuffer = imgData.data.data;
         let uint8Array = new Uint8Array(imgBuffer);
         let imgBlob = new Blob([ uint8Array ], { type: 'image/jpeg' });
         let imgURL = URL.createObjectURL(imgBlob);
         
         return imgURL;
      });
   }, [ product, review ]);

   const [ currImageIndex, setCurrImageIndex ] = useState(imageIndex || 0);
   const [ slideshowLength, setSlideshowLength ] = useState(4);
   const [ slideshowStartIndex, setSlideshowStartIndex ] = useState(
      imageIndex
         ? 
            (imageIndex + slideshowLength > imageList.length) 
               ? Math.max(imageList.length - slideshowLength, 0)
               : imageIndex
         : 0
   );

   function handleImageToggle(e) {
      setCurrImageIndex(prev => {
         let currIndex = e.target.id === 'previous-img'
            ? prev - 1 
            : prev + 1;

         //make sure selected image is visible in slideshow
         if (currIndex < slideshowStartIndex) {
            let diff = slideshowStartIndex - currIndex;
            setSlideshowStartIndex(prev => prev - diff);
         } else if (currIndex >= slideshowStartIndex + slideshowLength) {
            let diff = currIndex - slideshowStartIndex - slideshowLength + 1;
            setSlideshowStartIndex(prev => prev + diff);
         }

         return currIndex;
      });
   }

   function handleSlideshowToggle(e) {
      if (e.target.id === 'previous-slide') {
         setSlideshowStartIndex(prev => prev - 1);
      } else if (e.target.id === 'next-slide') {
         setSlideshowStartIndex(prev => prev + 1);
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
                  src={imageList[currImageIndex]}
                  placeholder={prodImgPlaceholder}
                  alt={product.name}
                  fill={true}
                  quality={100}
                  sizes='50vw'
                  priority={true}
               />
            </div>
            <button id='next-img' disabled={currImageIndex === imageList.length - 1}
               onClick={handleImageToggle}
            > &gt; </button>
         </div>

         <div className={styles['slideshow-container']}>
            {
               imageList.length > slideshowLength &&
                  <button id='previous-slide' disabled={slideshowStartIndex === 0}
                     onClick={handleSlideshowToggle}
                  > &lt; </button>
            }

            <ul className={styles['image-list']}>
               {
                  imageList.map((image, index) => {
                     if (
                        index < slideshowStartIndex || 
                        index >= slideshowStartIndex + slideshowLength
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
                                 placeholder={prodImgPlaceholder}
                                 alt={product.name}
                                 fill={true}
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
               imageList.length > slideshowLength &&
                  <button id='next-slide' 
                     disabled={slideshowStartIndex + slideshowLength >= imageList.length}
                     onClick={handleSlideshowToggle}
                  > &gt; </button>
            }
         </div>
      </div>
   );
};