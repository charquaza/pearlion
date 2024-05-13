import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/_styles/CartItem.module.css';

export default function CartItem({ 
   item, handleQuantityChange, validateQuantity, handleItemRemove 
}) {
   return (
      <article className={styles['cart-item']}>
         <div className={styles['image-and-details']}>
            <div className={styles['image-container']}>
               <Link href={`/${item.product.category}/${item.product.id}`}>
                  <Image
                     src={item.product.images[0]}
                     alt={item.product.name}
                     sizes='50vw'
                     priority={true}
                  />
               </Link>
            </div>
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
}