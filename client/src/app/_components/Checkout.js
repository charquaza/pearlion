'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, AddressElement } from '@stripe/react-stripe-js';
import { publicStripeAPIKey, apiURL } from '@/root/config';
import CheckoutForm from './CheckoutForm';
import styles from '../_styles/Checkout.module.css';

const stripePromise = loadStripe(publicStripeAPIKey);

export default function Checkout({ cart, setInCheckout }) {
   const [ clientSecret, setClientSecret ] = useState('');
   const [ paymentIntentId, setPaymentIntentId ] = useState('');
   const [ tax, setTax ] = useState(-1);
   const [ dpmCheckerLink, setDpmCheckerLink ] = useState('');
   const [ checkoutError, setCheckoutError ] = useState(null);

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
         headers: { 'Content-Type': 'application/json' },
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
            setTax(data.data.taxEstimate);
            // [DEV] For demo purposes only
            setDpmCheckerLink(data.data.dpmCheckerLink);
         })
         .catch(err => setCheckoutError(err));
   }, []);

   const appearance = {
      theme: 'stripe',
   };
   // Enable the skeleton loader UI for optimal loading.
   const loader = 'auto';

   function handleCartReturn(e) {
      setInCheckout(false);
   }

   async function handleAddressInput(e) {
      if (e.complete) {
         try {
            const address = e.value.address;

            const res = await fetch(apiURL + '/orders/tax', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ paymentIntentId, address }),
               mode: 'cors',
               credentials: 'include',
               cache: 'no-store'
            });
            const data = await res.json();

            if (data.errors) {
               console.error(data.errors);
            } else {
               setTax(data.data.taxAmount);
            }
         } catch (e) {
            console.error(e);
         }
      }
   }

   if (checkoutError) {
      console.error(checkoutError);
      
      return (
         <main className={styles['checkout']}>
            <h1>Checkout</h1>
            <p>We're having trouble with the checkout process...</p>
            <p>Please try again later, or contact us for assistance</p>
         </main>
      );
   }

   return (
      <main className={styles['checkout']}>
         <button onClick={handleCartReturn}>&lt; Back to Cart</button>

         <h1>Checkout</h1>

         <div>
            <p>Tax: ${tax}</p>
         </div>

         {clientSecret 
            ? 
               <Elements key={clientSecret} options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                  <h2>Shipping</h2>
                  <AddressElement options={{ mode: 'shipping' }} onChange={handleAddressInput} />

                  <h2>Payment</h2>
                  <CheckoutForm clientSecret={clientSecret} 
                     dpmCheckerLink={dpmCheckerLink} 
                  />
               </Elements>
            :
               <p>Loading...</p>
         }
      </main>
   );
};