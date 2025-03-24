'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '../_hooks/useUser';
import styles from '@/app/_styles/signUpPage.module.css';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function SignUpPage() {
   const [ inputValues, setInputValues ] = useState({
      firstName: '', lastName: '', username: '', password: '',
      confirmPassword: '', email: '', phone: ''
   });
   const [ signUpErrors, setSignUpErrors ] = useState([]);

   const { mutate } = useUser();
   const router = useRouter();

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         const fetchOptions = {
            method: 'POST',
            headers: { 
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(inputValues),
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };
         const fetchURL = apiURL + '/users/sign-up';
   
         const res = await fetch(fetchURL, fetchOptions);
         const data = await res.json();
   
         if (res.ok) {
            //store auth token in localStorage
            localStorage.setItem('token', data.token);

            setSignUpErrors(false);
            mutate();
            router.push('/');
         } else {
            setSignUpErrors(data.errors);
         }
      } catch (e) {
         setSignUpErrors([ 'Unable to sign up at this time, please try again later' ]);
         console.error('Error message: ' + e);
      }
   }

   return (
      <main className={styles['sign-up-page']}>
         <h1>Sign Up</h1>

         {
            signUpErrors.length > 0 &&
               <ul className={styles['error-list']}>
                  {signUpErrors.map(errMsg => <li key={errMsg}>{errMsg}</li>)}
               </ul>
         }

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