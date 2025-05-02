'use client';

import { useState } from 'react';
import styles from '@/app/_styles/LoginFormPopover.module.css';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginFormPopover({ setShowLoginPopover, revalidateCurrUser }) {
   const [ inputValues, setInputValues ] = useState({
      username: '', 
      password: ''
   });
   const [ loginError, setLoginError ] = useState(null);

   async function handleLogin(e) {
      e.preventDefault();

      try {
         const fetchOptions = {
            method: 'POST',
            headers: { 
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: (e.nativeEvent.submitter.id === 'guest-login-btn') 
               ? JSON.stringify({ username: 'guestuser1', password: 'guest' }) 
               : JSON.stringify(inputValues),
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };
         const fetchURL = apiURL + '/users/log-in';
   
         const res = await fetch(fetchURL, fetchOptions);
         const data = await res.json();
   
         if (res.ok) {
            //store auth token in localStorage
            localStorage.setItem('token', data.token);

            setShowLoginPopover(false);
            revalidateCurrUser();
            setLoginError(null);
         } else if (res.status === 401) {
            setLoginError(data.errors[0]);
         } else {
            setLoginError('Unable to log in at this time, please try again later');
         }
      } catch (e) {
         setLoginError('Unable to log in at this time, please try again later');
         console.error('Error message: ' + e);
      }
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   return (
      <form onSubmit={handleLogin} className={styles['login-form']}>
         {
            loginError &&
               <p className={styles['error-msg']}>{loginError}</p>
         }

         <label htmlFor='username'>Username:&nbsp;</label>
         <input type='text' name='username' id='username'
            required value={inputValues.username}
            onChange={handleInput}
         />

         <label htmlFor='password'>Password:&nbsp;</label>
         <input type='password' name='password' id='password'
            required value={inputValues.password}
            onChange={handleInput}
         />

         <button type='submit' className={styles['login-btn']}>Log In</button>

         <hr />

         <button type='submit' className={styles['guest-login-btn']} id='guest-login-btn'
            formNoValidate
         >
            Log In as Guest
         </button>
      </form>
   );
};