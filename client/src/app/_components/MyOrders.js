'use client';

import { DateTime } from 'luxon';
import useOrderList from '../_hooks/useOrderList';
import styles from '../_styles/MyOrders.module.css';

export default function MyOrders() {
   const { orderList, error } = useOrderList();

   if (error) {
      return (
         <article className={styles['my-orders']}>
            <h2>My Orders</h2>
            <p>We're having trouble loading your orders...</p>
            <p>Please try again later, or contact us.</p>
         </article>
      );   
   }

   return (
      <article className={styles['my-orders']}>
         <h2>My Orders</h2>

         <table>
            <caption>Orders</caption>
            <thead>
               <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Purchase Date</th>
                  <th scope='col'>Products</th>
                  <th scope='col'>Shipping Cost</th>
                  <th scope='col'>Tax</th>
                  <th scope='col'>Total Cost</th>
                  <th scope='col'>Fulfillment Status</th>
                  <th scope='col'>Delivery Date</th>
                  <th scope='col'>Return Status</th>
               </tr>
            </thead>
            <tbody>
               {orderList && orderList.data.map(order => {
                  return (
                     <tr key={order.id}>
                        <th scope='row'>{order.id}</th>
                        <td>
                           {DateTime.fromISO(order.purchaseDate).toLocaleString(DateTime.DATE_MED)}
                        </td>
                        <td>
                           <ul>
                              {order.Products.map(product => {
                                 return (
                                    <li key={product.id}>
                                       <p>
                                          {product.Purchase.quantityPurchased} x {product.name} 
                                          &nbsp;(${product.Purchase.unitPrice} each)
                                       </p>
                                    </li>
                                 );
                              })}
                           </ul>
                        </td>
                        <td>${order.shippingCost}</td>
                        <td>${order.tax}</td>
                        <td>${order.purchaseTotal}</td>
                        <td>{order.fulfillmentStatus}</td>
                        <td>
                           {DateTime.fromISO(order.deliveryDate).toLocaleString(DateTime.DATE_MED)}
                        </td>
                        <td>{order.returnStatus || 'N/A'}</td>
                     </tr>   
                  );
               })}
            </tbody>
         </table>
      </article>
   );
};