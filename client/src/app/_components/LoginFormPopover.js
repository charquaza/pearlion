'use client';

import { useState } from 'react';
import styles from '@/app/_styles/LoginFormPopover.module.css';

export default function LoginFormPopover() {
   const [ inputValues, setInputValues ] = useState({
      username: '', 
      password: ''
   });

   function handleLogin(e) {
      e.preventDefault();
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: [e.target.value] });
   }

   return (
      <form onSubmit={handleLogin} className={styles['login-form']}>
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

         <button type='submit'>Log In</button>
      </form>
   );
};