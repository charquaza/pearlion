'use client';

import Image from 'next/image';
import Link from 'next/link';
import { currencyFormat } from '../_utils/utils';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/CartItem.module.css';

export default function CartItem({ 
   item, handleQuantityChange, validateQuantity, 
   handleQuantityDecrement, handleQuantityIncrement, handleItemRemove 
}) {
   const imgURL = item.product.Images[0].url;

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
               <p>Price: <span className={styles['unit-price']}>{currencyFormat.format(item.product.price)}</span></p>
               <label className={styles['quantity-label']}>Quantity:&nbsp; 
                  <div className={styles['quantity-input-group']}>
                     <button onClick={handleQuantityDecrement}
                        disabled={item.quantity <= 1}
                        data-product-id={item.product.id}
                     >-</button>

                     <input type='text' required className={styles['quantity-input']}
                        value={item.quantity} data-product-id={item.product.id} 
                        onChange={handleQuantityChange} onBlur={validateQuantity}
                     />

                     <button onClick={handleQuantityIncrement}
                        disabled={item.quantity >= 99}
                        data-product-id={item.product.id}
                     >+</button>
                  </div>
               </label>
               <button onClick={handleItemRemove} 
                  data-product-id={item.product.id}
                  className={styles['remove-button']}
               >Remove</button>
            </div>
         </div>

         <p className={styles['item-subtotal']}>
            <span className={styles['price-x-quantity-text']}>{currencyFormat.format(item.product.price)} x {item.quantity} =&nbsp;&nbsp;</span>
            <span className={styles['item-subtotal-number']}>{currencyFormat.format(item.product.price * item.quantity)}</span>
         </p>
      </article>
   );
};