'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useUser from '@/app/_hooks/useUser';
import LoginFormPopover from './LoginFormPopover';
import { apiURL } from '@/root/config';
import styles from '@/app/_styles/Topbar.module.css';

export default function Topbar() {
   const [ showLoginPopover, setShowLoginPopover ] = useState(false);

   const { user, mutate } = useUser();

   useEffect(function addEventListeners() {
      //do not mix native browser events with React's synthetic events

      if (user && user.data) { //attach listeners if no user is logged in
         return;
      }

      function toggleLoginPopover(e) {
         setShowLoginPopover(prev => !prev);
         e.stopPropagation();
      }
      function closeLoginPopover(e) {
         setShowLoginPopover(false);
      }
      function handlePopoverClick(e) {
         e.stopPropagation();
      }

      var loginButton = document.getElementById('login-toggle-button');
      var popover = document.getElementById('popover');

      loginButton.addEventListener('click', toggleLoginPopover, false);
      popover.addEventListener('click', handlePopoverClick, false);
      document.body.addEventListener('click', closeLoginPopover, false);

      return () => {
         loginButton.removeEventListener('click', toggleLoginPopover, false);
         popover.removeEventListener('click', handlePopoverClick, false);
         document.body.removeEventListener('click', closeLoginPopover, false);
      };
   }, [user]);

   async function handleLogOut(e) {
      try {
         const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
         };
         const fetchURL = apiURL + '/users/log-out';

         const res = await fetch(fetchURL, fetchOptions);
         
         if (res.ok) {
            mutate();
         } else {
            const data = await res.json();
            console.error(data);
            alert('Logout unsuccessful - please try again later');
         }
      } catch (err) {
         console.error(err);
         alert('Logout unsuccessful - please try again later');
      }
   }

   return (
      <nav className={styles['topbar']}>
         <ul className={styles['nav-list']}>
            {
               (user && !user.errors) 
                  ?
                     <>
                        <li>
                           <Link href='/account' className={styles['account-link']}>My Account</Link>
                        </li>
                        <li>
                              <button 
                                 onClick={handleLogOut} className={styles['logout-btn']}
                              >Logout</button>
                        </li>
                     </>
                  :
                     <>
                        <li>
                           <div className={styles['popover-control']}>
                              <button 
                                 id='login-toggle-button'
                                 className={ showLoginPopover
                                    ? styles['close-popover-btn'] : styles['open-popover-btn']
                                 }
                              >
                                 { showLoginPopover ? 'Close' : 'Log In' }
                              </button>
               
                              <div 
                                 className={
                                    showLoginPopover 
                                       ? styles['login-popover-open']
                                       : styles['login-popover-closed']
                                 }
                                 id='popover'
                              >
                                 {
                                    showLoginPopover &&
                                       <LoginFormPopover 
                                          setShowLoginPopover={setShowLoginPopover} 
                                          revalidateCurrUser={mutate}
                                       />
                                 }
                              </div>
                           </div>            
                        </li>
                        <li>
                           <Link href='/sign-up' className={styles['sign-up-link']}>Sign Up</Link>
                        </li>
                     </>
            }

            <li>
               <Link href='/cart' aria-label='shopping cart' className={styles['cart-link']}>🛒</Link>
            </li>
         </ul>
      </nav>
   );
};