'use client';

import { useState } from 'react';
import { 
   PaymentElement, useStripe, useElements
} from '@stripe/react-stripe-js';
import styles from '../_styles/CheckoutForm.module.css';

export default function CheckoutForm() {
   const [ message, setMessage ] = useState(null);
   const [ isLoading, setIsLoading ] = useState(false);

   const stripe = useStripe();
   const elements = useElements();

   async function handleSubmit(e) {
      e.preventDefault();

      if (!stripe || !elements) {
         // Stripe.js hasn't yet loaded.
         // Make sure to disable form submission until Stripe.js has loaded.
         return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: 'http://localhost:3003/payment-status',
         },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === 'card_error' || error.type === 'validation_error') {
         setMessage(error.message);
      } else {
         setMessage('An unexpected error occurred.');
      }

      setIsLoading(false);
   }

   const paymentElementOptions = {
      layout: 'tabs'
   }

   return (
      <>
         <form className={styles['payment-form']} onSubmit={handleSubmit}>
            <PaymentElement className={styles['payment-element']} options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} className={styles['submit']}>
               <span className={styles['button-text']}>
                  {isLoading ? <div className={styles['spinner']} id='spinner'></div> : 'Place Order'}
               </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div className={styles['payment-message']}>{message}</div>}
         </form>
      </>
   );
};