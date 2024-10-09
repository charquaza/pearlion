'use client';

import { useState, useEffect } from 'react';
import CheckoutForm from './CheckoutForm';
import PaymentStatus from './PaymentStatus';

export default function Checkout({ clientSecret, dpmCheckerLink }) {
   const [ paymentProcessed, setPaymentProcessed ] = useState(null);

   useEffect(() => {
      const paymentIntentSecret = new URLSearchParams(window.location.search).get(
         "payment_intent_client_secret"
      );

      setPaymentProcessed(paymentIntentSecret ? true : false);
   }, []);

   return (
      <>
         {paymentProcessed === true && 
            <PaymentStatus />}
         {paymentProcessed === false &&
            <CheckoutForm clientSecret={clientSecret} dpmCheckerLink={dpmCheckerLink} />}
      </>
   );
}