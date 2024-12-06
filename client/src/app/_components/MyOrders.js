'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';
import useOrderList from '../_hooks/useOrderList';
import OrderPopover from './OrderPopover';
import styles from '../_styles/MyOrders.module.css';

export default function MyOrders() {
   const [ showOrderPopover, setShowOrderPopover ] = useState(false);
   const [ popoverOrderIndex, setPopoverOrderIndex ] = useState(null);
   const { orderList, error } = useOrderList();

   function openOrderPopover(e) {
      const orderIndex = e.target.dataset.orderIndex;
      setPopoverOrderIndex(orderIndex);
      setShowOrderPopover(true);
   }

   function closeOrderPopover(e) {
      setPopoverOrderIndex(null);
      setShowOrderPopover(false);
   }

   if (error) {
      return (
         <article className={styles['my-orders']}>
            <h2>My Orders</h2>
            <p>We&apos;re having trouble loading your orders...</p>
            <p>Please try again later, or contact us.</p>
         </article>
      );
   }

   return (
      <article className={styles['my-orders']}>
         <h2>My Orders</h2>

         {showOrderPopover && 
            <OrderPopover order={orderList.data[popoverOrderIndex]} 
               closeOrderPopover={closeOrderPopover}
            />
         }

         <table className={styles['orders-table']}>
            <caption>Orders</caption>
            <thead>
               <tr>
                  <th scope='col'>Order ID</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Products</th>
                  {/* <th scope='col'>Shipping Cost</th>
                  <th scope='col'>Tax</th> */}
                  {/* <th scope='col'>Total</th> */}
                  <th scope='col'>Status</th>
                  {/* <th scope='col'>Delivery Date</th> */}
                  {/* <th scope='col'>Return Status</th> */}
               </tr>
            </thead>
            <tbody>
               {orderList && orderList.data.map((order, index) => {
                  return (
                     <tr key={order.id} 
                        className={index == popoverOrderIndex ? styles['selected-order'] : ''}
                     >
                        <th scope='row' onClick={openOrderPopover}
                           className={styles['order-id-ctnr']}
                           data-order-index={index}
                        >
                           {order.id}
                        </th>
                        <td>
                           {DateTime.fromISO(order.purchaseDate).toLocaleString(DateTime.DATE_MED)}
                        </td>
                        <td>
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
                        </td>
                        {/* <td>${order.shippingCost}</td>
                        <td>${order.tax}</td> */}
                        {/* <td>${order.purchaseTotal}</td> */}
                        <td>{order.fulfillmentStatus}</td>
                        {/* <td>
                           {DateTime.fromISO(order.deliveryDate).toLocaleString(DateTime.DATE_MED)}
                        </td> */}
                        {/* <td>{order.returnStatus || 'N/A'}</td> */}
                     </tr>   
                  );
               })}
            </tbody>
         </table>
      </article>
   );
};