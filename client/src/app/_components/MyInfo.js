'use client';

import { useState } from 'react';
import useUser from '../_hooks/useUser';
import { apiURL } from '@/root/config';
import styles from '@/app/_styles/MyInfo.module.css';

export default function MyInfo() {
   const [ inEditMode, setInEditMode ] = useState(false);
   const [ inputValues, setInputValues ] = useState({
      firstName: '', lastName: '', username: '', email: '', phone: '', 
      newPassword: '', confirmNewPassword: '', currPassword: ''
   });
   const [ changePassword, setChangePassword ] = useState(false);
   const [ formErrors, setFormErrors ] = useState([]);

   const { user, mutate } = useUser();

   function toggleEditMode(e) {
      setInputValues({
         firstName: user.data.firstName, lastName: user.data.lastName, 
         username: user.data.username, email: user.data.email, 
         phone: user.data.phone || '', newPassword: '', confirmNewPassword: '', 
         currPassword: ''
      });
      setFormErrors([]);
      setChangePassword(false);
      setInEditMode(prev => !prev);
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function togglePasswordChange(e) {
      setInputValues({
         ...inputValues,
         newPassword: '', confirmNewPassword: '',
      });
      setChangePassword(prev => !prev);
   }

   async function handleFormSubmit(e) {
      e.preventDefault();
      
      try {
         const fetchOptions = {
            method: 'PUT',
            headers: { 
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputValues),
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         }
         const fetchURL = apiURL + '/users/' + user.data.id;

         const res = await fetch(fetchURL, fetchOptions);
         const data = await res.json();

         if (res.ok) {
            mutate(data);   //refetch updated user data
            setInputValues({
               firstName: '', lastName: '', username: '', email: '', phone: '', 
               newPassword: '', confirmNewPassword: '', currPassword: ''
            });
            setFormErrors([]);
            setChangePassword(false);
            setInEditMode(false);
         } else {
            setFormErrors(data.errors);
         }
      } catch (e) {
         setFormErrors([ e.message ]);
      }
   }

   return (
      user &&
      (inEditMode
         ? 
            <form className={styles['my-info-form']}
               onSubmit={handleFormSubmit}
            >
               <h2>My Information</h2>

               {
                  formErrors.length > 0 &&
                     <ul className={styles['form-errors']}>
                        {formErrors.map(errMsg => <li key={errMsg}>{errMsg}</li>)}
                     </ul>
               }

               <label htmlFor='firstName'>First Name:&nbsp;</label>
               <input type='text' name='firstName' id='firstName'
                  required value={inputValues.firstName}
                  maxLength='53' onChange={handleInput}
               />

               <label htmlFor='lastName'>Last Name:&nbsp;</label>
               <input type='text' name='lastName' id='lastName'
                  required value={inputValues.lastName}
                  maxLength='53' onChange={handleInput}
               />

               <label htmlFor='username'>Username:&nbsp;</label>
               <input type='text' name='username' id='username'
                  required value={inputValues.username}
                  maxLength='20' onChange={handleInput}
               />

               <label htmlFor='email'>Email:&nbsp;</label>
               <input type='email' name='email' id='email'
                  required value={inputValues.email}
                  maxLength='350' onChange={handleInput}
               />

               <label htmlFor='phone'>Phone (optional):&nbsp;</label>
               <input type='tel' name='phone' id='phone'
                  value={inputValues.phone} maxLength='25'
                  onChange={handleInput}
               />

               <div className={styles['change-password-container']}>
                  {changePassword 
                     ?
                        <div>
                           <label htmlFor='newPassword'>New Password:&nbsp;</label>
                           <input type='password' name='newPassword' id='newPassword'
                              required value={inputValues.newPassword}
                              minLength='8' maxLength='15'
                              onChange={handleInput}
                           />

                           <label htmlFor='confirmNewPassword'>Confirm Password:&nbsp;</label>
                           <input type='password' name='confirmNewPassword' 
                              id='confirmNewPassword' required 
                              value={inputValues.confirmNewPassword}
                              minLength='8' maxLength='15'
                              onChange={handleInput}
                           />

                           <button onClick={togglePasswordChange}>Cancel Password Change</button>
                        </div>
                     :
                        <button onClick={togglePasswordChange}>Change Password</button>
                  }
               </div>

               <label htmlFor='currPassword'>Current Password:&nbsp;</label>
               <input type='password' name='currPassword' id='currPassword'
                  required value={inputValues.currPassword}
                  minLength='8' maxLength='15'
                  onChange={handleInput}
               />

               <div className={styles['form-controls']}>
                  <button type='submit'>Save</button>

                  <button type='button' 
                     onClick={toggleEditMode}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         : 
            <article className={styles['my-info']}>
               <h2>My Information</h2>

               <p>First Name: {user.data.firstName}</p>
               <p>Last Name: {user.data.lastName}</p>
               <p>Username: {user.data.username}</p>
               <p>Email: {user.data.email}</p>
               <p>Phone: {user.data.phone}</p>

               <button onClick={toggleEditMode}>Edit</button>
            </article>
      )
   )
};