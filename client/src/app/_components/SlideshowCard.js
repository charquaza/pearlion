'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingBar from './RatingBar';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/SlideshowCard.module.css';

export default memo(function SlideshowCard({ product }) {
   if (product) {
      var mainProdImgData = product.Images[0];
      var imgBuffer = mainProdImgData.data.data;
      var uint8Array = new Uint8Array(imgBuffer);
      var imgBlob = new Blob([ uint8Array ], { type: 'image/jpeg' });
      var imgURL = URL.createObjectURL(imgBlob);   
   }

   return (
      product
         ?
            <article className={styles['slideshow-card']}>
               <div className={styles['image-container']}>
                  <Image 
                     src={imgURL} 
                     placeholder={prodImgPlaceholder}
                     alt={product.name}
                     fill={true}
                     quality={100}
                     sizes='50vw'         
                  />
               </div>

               <h2>
                  <Link 
                     href={`/${product.category}/${product.id}`}
                     className={styles['products-link']}
                  >
                     {product.name}
                  </Link>
               </h2>
               
               <div className={styles['rating-and-reviews-link']}>
                  <RatingBar reviewCount={product.reviewCount} ratingSum={product.ratingSum} 
                     context={'slideshow-card'} 
                  />
                  <Link 
                     href={`/${product.category}/${product.id}#reviews`}
                     className={styles['reviews-link']}
                  >
                     Reviews
                  </Link>
               </div>
            </article>
         :
            <article className={styles['slideshow-card']}>
               <p>Loading...</p>
            </article>
   );
});