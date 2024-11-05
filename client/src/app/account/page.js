'use client';

import useUser from '../_hooks/useUser.js';
import MyInfo from '../_components/MyInfo.js';
import MyOrders from '../_components/MyOrders.js';
import styles from '../_styles/accountPage.module.css';

export default function Account() {
   const { user, isLoading } = useUser();

   if (isLoading) {
      return (
         <main className={styles['account-page']}>
            <h1>Account</h1>
         </main>
      );
   }

   if (!user || user.errors) {
      return (
         <main className={styles['account-page']}>
            <h1>Account</h1>

            <p>Please log in to view your account.</p>
         </main>
      );
   }

   return (
      <main className={styles['account-page']}>
         <h1>Account</h1>
         
         <div className={styles['page-content']}>
            <MyInfo />
            <MyOrders />
         </div>
      </main>
   );
}