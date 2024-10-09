'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Checkout from '../_components/Checkout';
import { publicStripeAPIKey, apiURL } from '@/root/config';
import styles from '../_styles/checkoutPage.module.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(publicStripeAPIKey);

export default function CheckoutPage() {
   const [clientSecret, setClientSecret] = useState('');
   const [dpmCheckerLink, setDpmCheckerLink] = useState('');

   useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch(apiURL + '/orders/checkout', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ products: [{ id: 'xl-tshirt', amount: 1000 }] }),
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
         {clientSecret && (
            <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
               <Checkout clientSecret={clientSecret} dpmCheckerLink={dpmCheckerLink} />
            </Elements>
         )}
      </main>
   );
}