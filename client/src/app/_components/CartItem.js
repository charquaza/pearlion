'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/CartItem.module.css';

export default function CartItem({ 
   item, handleQuantityChange, validateQuantity, handleItemRemove 
}) {
   const imgURL = useMemo(() => {
      var mainProdImgData = item.product.Images[0];
      var imgBuffer = mainProdImgData.data.data;
      var uint8Array = new Uint8Array(imgBuffer);
      var imgBlob = new Blob([ uint8Array ], { type: 'image/jpeg' });
      var imgURL = URL.createObjectURL(imgBlob);   
      return imgURL;
   }, [item]);

   return (
      <article className={styles['cart-item']}>
         <div className={styles['image-and-details']}>
            <Link href={`/${item.product.category}/${item.product.id}`}>
               <div className={styles['image-container']}>
                  <Image
                     src={imgURL}
                     placeholder={prodImgPlaceholder}
                     alt={item.product.name}
                     fill={true}
                     sizes='50vw'
                     priority={true}
                  />
               </div>
            </Link>
            <div className={styles['item-details']}>
               <h2>
                  <Link href={`/${item.product.category}/${item.product.id}`}>
                     {item.product.name}
                  </Link>
               </h2>
               <p>Price: ${item.product.price}</p>
               <label className={styles['bold']}>Quantity:&nbsp; 
                  <input type='text' required className={styles['quantity-input']}
                     value={item.quantity} data-product-id={item.product.id} 
                     onChange={handleQuantityChange} onBlur={validateQuantity}
                  />
               </label>
               <button onClick={handleItemRemove} 
                  data-product-id={item.product.id}
                  className={styles['remove-button']}
               >Remove</button>
            </div>
         </div>

         <p className={styles['item-subtotal']}>
            <span className={styles['price-x-quantity-text']}>${item.product.price} x {item.quantity} =&nbsp;&nbsp;</span>
            <span className={styles['item-subtotal-number']}>${item.product.price * item.quantity}</span>
         </p>
      </article>
   );
};