'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiURL } from '@/root/config';
import Cart from '../_components/Cart';
import Checkout from '../_components/Checkout';
import styles from '@/app/_styles/cartPage.module.css';

export default function CartPage() {
   const [ cart, setCart ] = useState(null);
   const [ error, setError ] = useState(false);
   const [ inCheckout, setInCheckout ] = useState(false); 

   useEffect(function getCartFromLocalStorage() {
      (async () => {
         var localStorageCart = localStorage.getItem('cart');

         //check if localStorageCart is a non-empty, plain object 
         try {
            localStorageCart = JSON.parse(localStorageCart);

            if (
               !localStorageCart || 
               Object.prototype.toString.call(localStorageCart) !== '[object Object]' ||
               Object.keys(localStorageCart).length === 0
            ) {
               //remove invalid/empty cart from localStorage
               localStorage.removeItem('cart');
      
               setCart(new Map());
               return;
            }
         } catch (err) {
            localStorage.removeItem('cart');

            setCart(new Map());
            return;
         }

         //fetch productList from IDs stored in localStorageCart
         let urlParams = new URLSearchParams({
            images: 'main',
            productIds: (Object.keys(localStorageCart)).join(',')
         });

         let requestURL = new URL('products', apiURL);
         requestURL.search = urlParams.toString();
         requestURL = requestURL.toString();
      
         const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };

         let productList;
         try {
            const res = await fetch(requestURL, fetchOptions);
            const data = await res.json();

            if (data.errors) {
               console.error(data.errors);
               setError(true);
            } else {
               productList = data.data;
            }
         } catch (err) {
            console.error(err);
            setError(true);
            return;
         }
         
         //reconcile localStorageCart with productList
         let validatedCartMap = new Map();
         let validatedCartObj = {};

         productList.forEach(product => {
            var storedQuantity = localStorageCart[product.id];
            var validatedQuantity = 
               (
                  !Number.isInteger(storedQuantity) || 
                  !(0 < storedQuantity && storedQuantity < 100)
               ) 
                  ? 1 : storedQuantity;
   
            validatedCartMap.set(product.id, { product, quantity: validatedQuantity});
            validatedCartObj[product.id] = validatedQuantity;
         });

         //update localStorage
         localStorage.setItem('cart', JSON.stringify(validatedCartObj));

         setCart(validatedCartMap);
      })();
   }, []);

   //error state
   if (error) {
      return (
         <main className={styles['cart']}>
            <h1>Shopping Cart</h1>
            
            <p>Sorry, we're having trouble loading your cart.</p>
            <p>Please try again later.</p>
         </main>
      );
   }

   //loading state
   if (!cart) {
      return (
         <main className={styles['cart']}>
            <h1>Shopping Cart</h1>
            
            <p>Loading...</p>
         </main>
      );
   }

   //empty state
   if (cart.size === 0) {
      return (
         <main className={styles['cart']}>
            <h1>Shopping Cart</h1>
            
            <p>Your cart is empty</p>
            <Link href='/' className={styles['shop-link']}>Continue Shopping</Link>
         </main>
      );
   }

   return (
      inCheckout 
         ?
            <Checkout />
         :
            <Cart cart={cart} setCart={setCart} setInCheckout={setInCheckout} />
   );
};