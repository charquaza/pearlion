'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_styles/PurchaseControls.module.css';

export default function PurchaseControls({ productId }) {
   const [ quantity, setQuantity ] = useState('1');
   
   const router = useRouter();

   function handleQuantityChange(e) {
      //in the future: consider limiting quantity based on quantity in stock

      var currInput = e.target.value;
      if (
         currInput.length <= 2 &&   
         !(currInput.length === 1 && currInput === '0') &&  //forbid leading zeros
         !currInput.match(/\D/)
      ) {
         setQuantity(currInput);
      }
   }

   function validateQuantity(e) {
      //reset quantity to 1 if user leaves input blank
      if (quantity === '') {
         setQuantity('1');
      }
   }

   function handleQuantityDecrement(e) {
      setQuantity(Math.max(0, Number(quantity) - 1));
   }

   function handleQuantityIncrement(e) {
      setQuantity(Math.min(99, Number(quantity) + 1));
   }

   function handleAddToCart(e) {
      var cart = JSON.parse(localStorage.getItem('cart'));
      cart = Object.prototype.toString.call(cart) === '[object Object]'
         ? cart
         : {};

      var prevQuantityInCart = Number.isInteger(cart[productId])
         ? Math.abs(Math.trunc(cart[productId]))
         : 0;

      var newQuantity = prevQuantityInCart + Number(quantity) < 100
         ? prevQuantityInCart + Number(quantity)
         : 99;

      cart[productId] = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));

      router.push('/cart');
   }

   return (
      <div className={styles['purchase-controls']}>
         <div className={styles['label-input-group']}>
            <label htmlFor='quantity'
               className={styles['quantity-label']}
            >Quantity:</label>
   
            <div className={styles['input-group']}>
               <button onClick={handleQuantityDecrement}
                  disabled={Number(quantity) <= 0}
               >-</button>
      
               <input type='text' id='quantity' required 
                  value={quantity}
                  className={styles['quantity-input']} 
                  onChange={handleQuantityChange}
                  onBlur={validateQuantity}
               />
      
               <button onClick={handleQuantityIncrement}
                  disabled={Number(quantity) >= 99}
               >+</button>
            </div>
         </div>

         <button className={styles['add-to-cart-btn']}
            onClick={handleAddToCart}
         >Add to Cart</button>
      </div>
   );
};