'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItem from '@/app/_components/CartItem';
import earringsList from '@/app/_images/earringImageList';
import necklaceList from '@/app/_images/necklaceImageList';
import styles from '@/app/_styles/cartPage.module.css';

export default function CartPage() {
   const [ cart, setCart ] = useState(null);
   
   useEffect(function getCartFromLocalStorage() {
      var storedCart = JSON.parse(localStorage.getItem('cart'));

      var cartItems = new Map();
      for (const id in storedCart) {
         let validatedQuantity = 
            (
               !Number.isInteger(storedCart[id]) || 
               !(0 < storedCart[id] && storedCart[id] < 100)
            ) 
               ? 1 : storedCart[id];
   
         cartItems.set(
            id,
            {
               product: (earringsList.find(earrings => earrings.id === id) ||
                  necklaceList.find(necklace => necklace.id === id)),
               quantity: validatedQuantity
            }
         );
      }

      setCart(cartItems);
   }, []);

   function handleQuantityChange(e) {
      //in the future: consider limiting quantity based on quantity in stock

      var currInput = e.target.value;
      if (
         currInput.length <= 2 &&   
         !(currInput.length === 1 && currInput === '0') &&  //forbid leading zeros
         !currInput.match(/\D/)
      ) {
         setCart(prev => {
            var updatedCart = new Map(prev);
   
            var updatedData = prev.get(e.target.dataset.productId);
            updatedData.quantity = currInput;
   
            updatedCart.set(e.target.dataset.productId, updatedData);
            return updatedCart;
         });
      }
   }

   function validateQuantity(e) {      
      setCart(prev => {
         var updatedCart = new Map(prev);

         var currQuantity = prev.get(e.target.dataset.productId).quantity;
         
         //reset quantity to 1 if user leaves input blank
         if (currQuantity === '') {
            currQuantity = 1;
         }

         var updatedData = prev.get(e.target.dataset.productId);
         updatedData.quantity = Number(currQuantity);

         updatedCart.set(e.target.dataset.productId, updatedData);

         //update localStorage
         var cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : {};
         cart[e.target.dataset.productId] = currQuantity;
         localStorage.setItem('cart', JSON.stringify(cart));

         return updatedCart;
      });
   }

   function handleItemRemove(e) {
      setCart(prev => {
         var updatedCart = new Map(prev);
         updatedCart.delete(e.target.dataset.productId);
         return updatedCart;
      });

      //update localStorage
      var cart = localStorage.getItem('cart')
         ? JSON.parse(localStorage.getItem('cart'))
         : {};
      delete cart[e.target.dataset.productId];
      localStorage.setItem('cart', JSON.stringify(cart));
   }

   return (
      <main className={styles['cart']}>
         <h1>Shopping Cart</h1>

         {
            cart &&
               <>
                  <div className={styles['items-container']}>
                     {
                        cart.size > 0
                           ?
                              <ul>
                                 {
                                    Array.from(cart, ([productId, data]) => {
                                       return (
                                          <li key={productId}>
                                             <CartItem item={data} 
                                                handleQuantityChange={handleQuantityChange}
                                                validateQuantity={validateQuantity}
                                                handleItemRemove={handleItemRemove}
                                             />
                                          </li>
                                       );
                                    })
                                 }
                              </ul>
                           : 
                              <>
                                 <p>Your cart is empty</p>
                                 <Link href='/' className={styles['shop-link']}>Continue Shopping</Link>
                              </>
                     }
                  </div>
      
                  {
                     cart.size > 0 &&
                        <div className={styles['total-and-checkout']}>
                              <p>
                                 <span className={styles['subtotal-text']}>Subtotal:&nbsp;&nbsp;</span> 
                                 <span className={styles['subtotal-number']}>
                                    $
                                    {
                                       Array.from(cart, ([productId, data]) => data)
                                          .reduce((prevSum, currItem) => {
                                             let currSum = currItem.product.price * currItem.quantity;
                                             return prevSum + currSum;
                                          }, 0)
                                    }
                                 </span>
                              </p>
                              <p className={styles['taxes-shipping-text']}>(taxes and shipping calculated at checkout)</p>
               
                              <button>Checkout</button>
                        </div>
                  }
               </>         
         }
      </main>
   );
};