'use client';

import { useContext } from 'react';
import CheckoutStatusContext from '../_contexts/CheckoutStatusContext';
import CartItem from '@/app/_components/CartItem';
import { currencyFormat } from '../_utils/utils';
import styles from '@/app/_styles/Cart.module.css';

export default function Cart({ cart, setCart, setInCheckout }) {
   const { setInCheckout: contextSetInCheckout } = useContext(CheckoutStatusContext);

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
         var cart = JSON.parse(localStorage.getItem('cart'));
         cart = Object.prototype.toString.call(cart) === '[object Object]'
            ? cart
            : {};
         cart[e.target.dataset.productId] = currQuantity;
         localStorage.setItem('cart', JSON.stringify(cart));

         return updatedCart;
      });
   }

   function handleQuantityDecrement(e) {
      setCart(prev => {
         var updatedCart = new Map(prev);
         var productToUpdate = updatedCart.get(e.target.dataset.productId);
         var newQuantity = Math.max(1, productToUpdate.quantity - 1); 
         
         productToUpdate.quantity = newQuantity;

         //update localStorage
         var cart = JSON.parse(localStorage.getItem('cart'));
         cart = Object.prototype.toString.call(cart) === '[object Object]'
            ? cart
            : {};
         cart[e.target.dataset.productId] = newQuantity;
         localStorage.setItem('cart', JSON.stringify(cart));

         return updatedCart;
      });
   }

   function handleQuantityIncrement(e) {
      setCart(prev => {
         var updatedCart = new Map(prev);
         var productToUpdate = updatedCart.get(e.target.dataset.productId);
         var newQuantity = Math.min(99, productToUpdate.quantity + 1); 
         
         productToUpdate.quantity = newQuantity;

         //update localStorage
         var cart = JSON.parse(localStorage.getItem('cart'));
         cart = Object.prototype.toString.call(cart) === '[object Object]'
            ? cart
            : {};
         cart[e.target.dataset.productId] = newQuantity;
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
      var cart = JSON.parse(localStorage.getItem('cart'));
      if (Object.prototype.toString.call(cart) === '[object Object]') {
         delete cart[e.target.dataset.productId];
         localStorage.setItem('cart', JSON.stringify(cart));
      } else {
         localStorage.setItem('cart', JSON.stringify({}));
      }
   }

   function handleCheckout(e) {
      // if (typeof window !== 'undefined') {
      //    //hide sidebar and topbar for checkout
      //    const sidebar = document.querySelector('body > nav');
      //    sidebar.style.display = 'none';

      //    const topbar = document.querySelector('body > header > nav');
      //    topbar.style.display = 'none';
      // }

      contextSetInCheckout(true);
      setInCheckout(true);
   }

   return (
      <main className={styles['cart']}>
         <h1>Shopping Cart</h1>
            <div className={styles['items-container']}>
               <ul>
                  {
                     Array.from(cart, ([productId, data]) => {
                        return (
                           <li key={productId}>
                              <CartItem 
                                 item={data} 
                                 handleQuantityChange={handleQuantityChange}
                                 validateQuantity={validateQuantity}
                                 handleQuantityDecrement={handleQuantityDecrement}
                                 handleQuantityIncrement={handleQuantityIncrement}
                                 handleItemRemove={handleItemRemove}
                              />
                           </li>
                        );
                     })
                  }
               </ul>
            </div>
            
            <div className={styles['total-and-checkout']}>
               <p>
                  <span className={styles['subtotal-text']}>Subtotal:&nbsp;&nbsp;</span> 
                  <span className={styles['subtotal-number']}>
                     {currencyFormat.format(
                        Array.from(cart, ([productId, data]) => data)
                           .reduce((prevSum, currItem) => {
                              let currSum = currItem.product.price * currItem.quantity;
                              return prevSum + currSum;
                           }, 0)
                     )}
                  </span>
               </p>
               <p className={styles['taxes-shipping-text']}>
                  (taxes and shipping calculated at checkout)
               </p>

               <button onClick={handleCheckout} className={styles['checkout-btn']}>Checkout</button>
            </div>
      </main>
   );
};