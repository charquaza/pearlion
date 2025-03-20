'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingBar from './RatingBar';
import { currencyFormat } from '../_utils/utils';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/SlideshowCard.module.css';

export default memo(function SlideshowCard({ product }) {
   return (
      product
         ?
            <article className={styles['slideshow-card']}>
               <div className={styles['image-container']}>
                  <Image 
                     src={product.Images[0].url} 
                     placeholder={prodImgPlaceholder}
                     alt={product.name}
                     fill={true}
                     quality={100}
                     sizes='50vw'         
                  />
               </div>

               <h3>
                  <Link 
                     href={`/${product.category}/${product.id}`}
                     className={styles['products-link']}
                  >
                     {product.name}
                  </Link>
               </h3>
               
               <div className={styles['rating-and-price-ctnr']}>
                  <RatingBar reviewCount={product.reviewCount} ratingSum={product.ratingSum} 
                     context={'slideshow-card'} 
                  />
                  
                  <p className={styles['product-price']}>{currencyFormat.format(product.price)}</p>
               </div>
            </article>
         :
            <article className={styles['slideshow-card']}>
               <p>Loading...</p>
            </article>
   );
});