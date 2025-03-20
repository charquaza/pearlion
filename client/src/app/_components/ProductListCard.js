'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RatingBar from './RatingBar';
import { currencyFormat } from '../_utils/utils';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/ProductListCard.module.css';

export default memo(function ProductListCard({ product }) {
   return (
      product 
         ?
            <article className={styles['product-list-card']}>
               <div className={styles['image-container']}>
                  <Image 
                     src={product.Images[0].url}
                     placeholder={prodImgPlaceholder}
                     alt={product.Images[0].description}
                     fill={true}
                     quality={100}
                     sizes='30vw'
                  />
               </div>

               <div className={styles['name-price-ctnr']}>
                  <h3>
                     <Link 
                        href={`/${product.category}/${product.id}`}
                        className={styles['products-link']}
                     >
                        {product.name}
                     </Link>
                  </h3>

                  <p className={styles['product-price']}>{currencyFormat.format(product.price)}</p>
               </div>

               <div className={styles['rating-and-reviews-link']}>
                  <RatingBar reviewCount={product.reviewCount} ratingSum={product.ratingSum}
                     context={'product-list-card'} 
                  />
                  <Link 
                     href={`/${product.category}/${product.id}#reviews`}
                     className={styles['reviews-link']}
                  >
                     Reviews (<span className={styles['review-count']}>{product.reviewCount}</span>)
                  </Link>
               </div>
            </article>
         :
            <article className={styles['product-list-card']}>
               <div className={styles['image-container']}>
                  <Image 
                     src={prodImgPlaceholder}
                     alt='loading image...'
                     fill={true}
                     quality={100}
                     sizes='30vw'
                  />
               </div>

               <p>
                  Loading...
               </p>

               <div className={styles['rating-and-reviews-link']}>
               </div>
            </article>
   );
});