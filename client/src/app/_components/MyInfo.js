'use client';

import { useState } from 'react';
import useUser from '../_hooks/useUser';
import styles from '@/app/_styles/MyInfo.module.css';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

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

               <label htmlFor='firstName'>
                  First Name:&nbsp;
                  <input type='text' name='firstName' id='firstName'
                     required value={inputValues.firstName}
                     maxLength='53' onChange={handleInput}
                  />
               </label>

               <label htmlFor='lastName'>
                  Last Name:&nbsp;
                  <input type='text' name='lastName' id='lastName'
                     required value={inputValues.lastName}
                     maxLength='53' onChange={handleInput}
                  />
               </label>

               <label htmlFor='username'>
                  Username:&nbsp;
                  <input type='text' name='username' id='username'
                     required value={inputValues.username}
                     maxLength='20' onChange={handleInput}
                  />
               </label>

               <label htmlFor='email'>
                  Email:&nbsp;
                  <input type='email' name='email' id='email'
                     required value={inputValues.email}
                     maxLength='350' onChange={handleInput}
                  />
               </label>

               <label htmlFor='phone'>
                  Phone (optional):&nbsp;
                  <input type='tel' name='phone' id='phone'
                     value={inputValues.phone} maxLength='25'
                     onChange={handleInput}
                  />
               </label>

               <div className={styles['change-password-container']}>
                  {changePassword 
                     ?
                        <>
                           <label htmlFor='newPassword'>
                              New Password:&nbsp;
                              <input type='password' name='newPassword' id='newPassword'
                                 required value={inputValues.newPassword}
                                 minLength='8' maxLength='15'
                                 onChange={handleInput}
                              />
                           </label>

                           <label htmlFor='confirmNewPassword'>
                              Confirm Password:&nbsp;
                              <input type='password' name='confirmNewPassword' 
                                 id='confirmNewPassword' required 
                                 value={inputValues.confirmNewPassword}
                                 minLength='8' maxLength='15'
                                 onChange={handleInput}
                              />
                           </label>

                           <button onClick={togglePasswordChange} 
                              className={styles['cancel-password-change-btn']}
                           >Cancel Password Change</button>
                        </>
                     :
                        <button onClick={togglePasswordChange}>Change Password</button>
                  }
               </div>

               <label htmlFor='currPassword'>
                  Current Password:&nbsp;
                  <input type='password' name='currPassword' id='currPassword'
                     required value={inputValues.currPassword}
                     onChange={handleInput}
                  />
               </label>

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

               <p>
                  <span className={styles['name']}>
                     {user.data.firstName + ' ' + user.data.lastName}
                  </span>
               </p>
               <p>
                  username:&nbsp;&nbsp;
                  <span className={styles['info']}>
                     {user.data.username}
                  </span>
               </p>
               <p>
                  email:&nbsp;&nbsp;
                  <span className={styles['info']}>
                     {user.data.email}
                  </span>
               </p>
               <p>
                  phone:&nbsp;&nbsp;
                  <span className={styles['info']}>
                     {user.data.phone}
                  </span>
               </p>

               <button onClick={toggleEditMode}
                  className={styles['edit-info-btn']}
               >Edit</button>
            </article>
      )
   )
};