'use client';

import { useState } from 'react';
import styles from '@/app/_styles/signUpPage.module.css';

export default function SignUpPage() {
   const [ inputValues, setInputValues ] = useState({
      firstName: '', lastName: '', username: '', password: '',
      confirmPassword: '', email: '', phone: ''
   });

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function handleSubmit(e) {
      e.preventDefault();
   }

   return (
      <main className={styles['sign-up-page']}>
         <h1>Sign Up</h1>

         <form onSubmit={handleSubmit}>
            <div className={styles['first-last-name-inputs']}>
               <label htmlFor='firstName'>First <br/> Name:&nbsp;
                  <input type='text' id='firstName' name='firstName' 
                     required value={inputValues.firstName}
                     onChange={handleInput}
                  />
               </label>
   
               <label htmlFor='lastName'>Last <br/> Name:&nbsp;
                  <input type='text' id='lastName' name='lastName' 
                     required value={inputValues.lastName}
                     onChange={handleInput}
                  />
               </label>
            </div>

            <label htmlFor='username'>Username:&nbsp;
               <input type='text' id='username' name='username' 
                  required value={inputValues.username}
                  onChange={handleInput}
               />
            </label>
            
            <div className={styles['passwords-inputs']}>
               <label htmlFor='password'>Password:&nbsp;
                  <input type='password' id='password' name='password' 
                     required value={inputValues.password}
                     onChange={handleInput}
                  />
               </label>
   
               <label htmlFor='confirmPassword'>Confirm <br/> Password:&nbsp;
                  <input type='password' id='confirmPassword' name='confirmPassword' 
                     required value={inputValues.confirmPassword}
                     onChange={handleInput}
                  />
               </label>
            </div>

            <label htmlFor='email'>Email:&nbsp;
               <input type='email' id='email' name='email' 
                  required value={inputValues.email}
                  onChange={handleInput}
               />
            </label>

            <label htmlFor='phone'>Phone <br/> (optional):&nbsp;
               <input type='tel' id='phone' name='phone' 
                  value={inputValues.phone} onChange={handleInput}
               />
            </label>

            <button type='submit'>Sign Up</button>
         </form>
      </main>
   );
};