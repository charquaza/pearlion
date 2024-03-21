import Image from 'next/image';
import styles from '@/app/_styles/CartItem.module.css';

export default function CartItem({ item }) {
   return (
      <article className={styles['cart-item']}>
         <div className={styles['image-and-details']}>
            <div className={styles['image-container']}>
               <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  sizes='50vw'
                  priority={true}
               />
            </div>
            <div className={styles['item-details']}>
               <h2>{item.product.name}</h2>
               <p>Price: ${item.product.price}</p>
               <p>Quantity: {item.quantity}</p>
            </div>
         </div>

         <p className={styles['item-subtotal']}>
            <span className={styles['price-x-quantity-text']}>${item.product.price} x {item.quantity} =&nbsp;&nbsp;</span>
            <span className={styles['item-subtotal-number']}>${item.product.price * item.quantity}</span>
         </p>
      </article>
   );
}