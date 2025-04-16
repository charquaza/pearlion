'use client';

import { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, AddressElement } from '@stripe/react-stripe-js';
import CheckoutStatusContext from '../_contexts/CheckoutStatusContext';
import CheckoutForm from './CheckoutForm';
import { currencyFormat } from '../_utils/utils';
import styles from '../_styles/Checkout.module.css';

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const publicStripeAPIKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

const stripePromise = loadStripe(publicStripeAPIKey);

export default function Checkout({ cart, setInCheckout }) {
   const [ clientSecret, setClientSecret ] = useState('');
   const [ paymentIntentId, setPaymentIntentId ] = useState('');
   const [ tax, setTax ] = useState(0);
   const [ checkoutError, setCheckoutError ] = useState(null);

   const { setInCheckout: contextSetInCheckout } = useContext(CheckoutStatusContext);

   useEffect(() => {
      const cartArray = Array.from(cart, ([productId, data]) => {
         return ({
            product: productId,
            unitPrice: data.product.price,
            quantityPurchased: data.quantity
         });
      });

      fetch(apiURL + '/orders/checkout', {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
         },
         body: JSON.stringify(cartArray),
         mode: 'cors',
         credentials: 'include',
         cache: 'no-store'
      })
         .then((res) => {
            if (res.ok) {
               return res.json();
            } else {
               throw new Error(res.errors[0]);
            }
         })
         .then((data) => {
            setClientSecret(data.data.clientSecret);
            setPaymentIntentId(data.data.paymentIntentId);
            setTax(Number(data.data.taxEstimate) || 0);
         })
         .catch(err => setCheckoutError(err));
   }, [cart]);

   const addressAppearance = {
      theme: 'stripe',
      variables: {
         fontSizeBase: '1em',
      },
      rules: {
         '.Input': {
            padding: '0.6em'
         }
      }
   };

   // Enable the skeleton loader UI for optimal loading.
   const loader = 'auto';

   const shippingCost = 0;
   const cartSubtotal = Array.from(cart, ([productId, data]) => data)
      .reduce((prevSum, currItem) => {
         let currSum = currItem.product.price * currItem.quantity;
         return prevSum + currSum;
      }, 0);

   function handleCartReturn(e) {
      // if (typeof window !== 'undefined') {
      //    //show sidebar and topbar for checkout
      //    const sidebar = document.querySelector('body > nav');
      //    sidebar.style.display = '';

      //    const topbar = document.querySelector('body > header > nav');
      //    topbar.style.display = '';
      // }

      contextSetInCheckout(false);
      setInCheckout(false);
   }

   async function handleAddressInput(e) {
      if (e.complete) {
         try {
            const address = e.value.address;

            const res = await fetch(apiURL + '/orders/tax', {
               method: 'POST',
               headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
               },
               body: JSON.stringify({ paymentIntentId, address }),
               mode: 'cors',
               credentials: 'include',
               cache: 'no-store'
            });
            const data = await res.json();

            if (data.errors) {
               console.error(data.errors);
            } else {
               setTax(Number(data.data.taxAmount));
            }
         } catch (e) {
            console.error(e);
         }
      }
   }

   if (checkoutError) {
      contextSetInCheckout(false);

      console.error(checkoutError);
      
      return (
         <main className={styles['checkout-error']}>
            <h1>Checkout</h1>
            <p>We&apos;re having trouble with the checkout process...</p>
            <p>Please try again later.</p>
         </main>
      );
   }

   return (
      <main className={styles['checkout']}>
         <section className={styles['checkout-ui']}>
            <button onClick={handleCartReturn} 
               className={styles['back-to-cart-btn']}
            >&lt; Back to Cart</button>

            <h1>Checkout</h1>
            
            {clientSecret 
               ? 
                  <Elements key={clientSecret} options={{clientSecret, loader, appearance: addressAppearance}} stripe={stripePromise}>
                     <h2>Shipping</h2>
                     <div className={styles['shipping-section']}>
                        <AddressElement options={{ mode: 'shipping', appearance: addressAppearance }} onChange={handleAddressInput} />
                     </div>

                     <h2>Payment</h2>
                     <CheckoutForm clientSecret={clientSecret} />
                  </Elements>
               :
                  <p>Loading...</p>
            }
         </section>

         <section className={styles['order-breakdown']}>
            <h2>Order Summary</h2>
            <ul>
               {
                  Array.from(cart, ([productId, data]) => {
                     return (
                        <li key={productId}>
                           <p className={styles['product-name']}>{data.product.name}</p>
                           <p className={styles['price-breakdown']}>
                              <span className={styles['price-x-quantity-text']}>
                                 {currencyFormat.format(data.product.price)} x {data.quantity} =&nbsp;
                              </span>
                              <span className={styles['item-subtotal-number']}>
                                 {currencyFormat.format(data.product.price * data.quantity)}
                              </span>
                           </p>
                        </li>
                     );
                  })
               }
            </ul>

            <p className={styles['subtotal']}>
               <span className={styles['subtotal-text']}>Subtotal:&nbsp;</span> 
               <span className={styles['subtotal-number']}>
                  {currencyFormat.format(cartSubtotal)}
               </span>
            </p>
            <p className={styles['shipping']}>
               <span className={styles['shipping-text']}>Shipping:&nbsp;</span> 
               <span className={styles['shipping-number']}>
                  {currencyFormat.format(shippingCost)}
               </span>
            </p>
            <p className={styles['tax']}>
               <span className={styles['tax-text']}>Tax:&nbsp;</span> 
               <span className={styles['tax-number']}>
                  {currencyFormat.format(tax)}
               </span>
            </p>
            <p className={styles['total']}>
               <span className={styles['total-text']}>Total:&nbsp;</span> 
               <span className={styles['total-number']}>
                  {currencyFormat.format(cartSubtotal + tax)}
               </span>
            </p>
         </section>
      </main>
   );
};