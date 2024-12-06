'use client';

import Link from 'next/link';
import { DateTime } from 'luxon';
import styles from '../_styles/OrderPopover.module.css';

export default function OrderPopover({ order, closeOrderPopover }) {
   return (
      <div className={styles['order-popover']}>
         <article className={styles['order-details']}>
            <button 
               onClick={closeOrderPopover} 
               className={styles['close-popover-btn']}
            >
               &#x2715;
            </button>

            <h3>Order Details</h3>

            <p>Order ID: <span>{order.id}</span></p>

            <div>
               <p>
                  Order Date:&nbsp;
                  <span>{DateTime.fromISO(order.purchaseDate).toLocaleString(DateTime.DATE_MED)}</span>
               </p>
               <p>Delivery Date:&nbsp;
                  <span>{DateTime.fromISO(order.deliveryDate).toLocaleString(DateTime.DATE_MED)}</span>
               </p>
            </div>

            <div>
               <p>Fulfillment Status: <span>{order.fulfillmentStatus}</span></p>
               <p>Return Status: <span>{order.returnStatus || 'N/A'}</span></p>
   
            </div>

            <p>Order Total: <span>${order.purchaseTotal}</span></p>
            <div className={styles['shipping-tax-div']}>
               <p>Shipping: <span>${order.shippingCost}</span></p>
               <p>Tax: <span>${order.tax}</span></p>
            </div>

            <p>Products Purchased:&nbsp;</p>
            <ul>
               {order.Products.map(product => {
                  return (
                     <li key={product.id}>
                        <p>
                           {product.Purchase.quantityPurchased} x 
                           &nbsp;
                           <Link href={'/' + product.category + '/' + product.id}>
                              {product.name}
                           </Link> 
                           &nbsp;(${product.Purchase.unitPrice} each)
                        </p>
                     </li>
                  );
               })}
            </ul>
         </article>
      </div>
   );
};