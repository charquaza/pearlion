'use client';

import { useState } from 'react';
import CheckoutStatusContext from './CheckoutStatusContext';

export default function CheckoutStatusProvider({ children }) {
   const [ inCheckout, setInCheckout ] = useState(false);

   return (
      <CheckoutStatusContext.Provider value={{ inCheckout, setInCheckout }}>
         { children }
      </CheckoutStatusContext.Provider>
   );
};