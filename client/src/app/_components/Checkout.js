'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { publicStripeAPIKey, apiURL } from '@/root/config';
import CheckoutForm from './CheckoutForm';
import styles from '../_styles/Checkout.module.css';

const stripePromise = loadStripe(publicStripeAPIKey);

export default function Checkout({ cart }) {
   const [ clientSecret, setClientSecret ] = useState('');
   const [ dpmCheckerLink, setDpmCheckerLink ] = useState('');

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
         .then((res) => res.json())
         .then((data) => {
            setClientSecret(data.data.clientSecret);
            // [DEV] For demo purposes only
            setDpmCheckerLink(data.data.dpmCheckerLink);
         });
   }, []);

   const appearance = {
      theme: 'stripe',
   };
   // Enable the skeleton loader UI for optimal loading.
   const loader = 'auto';

   return (
      <main className={styles['checkout']}>
         {clientSecret && 
            <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
               <CheckoutForm clientSecret={clientSecret} 
                  dpmCheckerLink={dpmCheckerLink} 
               />
            </Elements>
         }
      </main>
   );
};