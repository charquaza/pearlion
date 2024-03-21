import CartItem from '@/app/_components/CartItem';
import earringsList from '@/app/_images/earringImageList';
import necklaceList from '@/app/_images/necklaceImageList';
import styles from '@/app/_styles/cartPage.module.css';

export default function CartPage() {
   var cartItems = [
      { id: 'e8', quantity: 2 }, { id: 'n9', quantity: 5 }
   ];
   var cartItemDetails = [
      { 
         product: earringsList.find(earrings => earrings.id === cartItems[0].id),
         quantity: cartItems[0].quantity
      },
      {
         product: necklaceList.find(necklace => necklace.id === cartItems[1].id),
         quantity: cartItems[1].quantity
      }
   ];

   return (
      <main className={styles['cart']}>
         <h1>Shopping Cart</h1>

         <ul>
            {
               cartItemDetails.map(item => {
                  return (
                     <li key={item.id}>
                        <CartItem item={item} />
                     </li>
                  );
               })
            }
         </ul>

         <div className={styles['total-and-checkout']}>
            <p>
               <span className={styles['subtotal-text']}>Subtotal:&nbsp;&nbsp;</span> 
               <span className={styles['subtotal-number']}>
                  $
                  {
                     cartItemDetails.reduce((prevSum, currItem) => {
                        let currSum = currItem.product.price * currItem.quantity;
                        return prevSum + currSum;
                     }, 0)
                  }
               </span>
            </p>
            <p className={styles['taxes-shipping-text']}>(taxes and shipping calculated at checkout)</p>

            <button>Checkout</button>
         </div>
      </main>
   );
};