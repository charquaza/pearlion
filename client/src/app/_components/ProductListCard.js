import Image from 'next/image';
import Link from 'next/link';
import RatingBar from './RatingBar';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/ProductListCard.module.css';

export default function ProductListCard({ product }) {
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
            <article className={styles['product-list-card']}>
               <div className={styles['image-container']}>
                  <Image 
                     src={imgURL}
                     placeholder={prodImgPlaceholder}
                     alt={mainProdImgData.description}
                     fill={true}
                     quality={100}
                     sizes='30vw'
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
                     context={'product-list-card'} 
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
};