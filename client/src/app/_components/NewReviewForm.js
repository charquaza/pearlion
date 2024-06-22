import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/_styles/NewReviewForm.module.css';

export default function NewReviewForm({ product }) {
   const [ showReviewForm, setShowReviewForm ] = useState(false);
   const [ inputValues, setInputValues ] = useState({ rating: '0', review: '' });

   function toggleReviewForm(e) {
      setInputValues({ rating: '0', review: '' });
      setShowReviewForm(prev => !prev);
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function handleFormSubmit(e) {
      e.preventDefault();
   }

   return (
      showReviewForm
         ? 
            <form className={styles['new-review-form']}
               onSubmit={handleFormSubmit}
            >
               <h3>Your Review for:</h3>
               <div className={styles['product-info']}>
                  <div className={styles['product-image-container']}>
                     <Image
                        src={product.images[0]}
                        alt={product.name}
                        quality={100}
                        sizes='10vw'
                        priority={true}
                     />
                  </div>

                  <p className={styles['product-name']}>
                     {product.name}
                  </p>
               </div>

               <fieldset className={styles['rating-fieldset']}>
                  <legend>Rating:</legend>
                  <div className={styles['rating']}>
                     <input type='radio' id='rating-1' name='rating' 
                        value='1' checked={inputValues.rating === '1'} 
                        onChange={handleInput}
                     />
                     <label htmlFor='rating-1'>
                        1
                     </label>

                     <input type='radio' id='rating-2' name='rating' 
                        value='2' checked={inputValues.rating === '2'}
                        onChange={handleInput}
                     />
                     <label htmlFor='rating-2'>
                        2
                     </label>

                     <input type='radio' id='rating-3' name='rating' 
                        value='3' checked={inputValues.rating === '3'}
                        onChange={handleInput}
                     />
                     <label htmlFor='rating-3'>
                        3
                     </label>

                     <input type='radio' id='rating-4' name='rating' 
                        value='4' checked={inputValues.rating === '4'}
                        onChange={handleInput}
                     />
                     <label htmlFor='rating-4'>
                        4
                     </label>

                     <input type='radio' id='rating-5' name='rating' 
                        value='5' checked={inputValues.rating === '5'}
                        onChange={handleInput}
                     />
                     <label htmlFor='rating-5'>
                        5
                     </label>
                  </div>
               </fieldset>

               <label>
                  Review:&nbsp;
                  <textarea
                     placeholder='Write your review here'
                     name='review' value={inputValues.review}
                     onChange={handleInput}
                  />
               </label>

               <button type='submit'>Submit</button>

               <button type='button' 
                  onClick={toggleReviewForm}
               >
                  Discard Review
               </button>
            </form>
         : 
            <button className={styles['add-review-button']}
               onClick={toggleReviewForm}
            >
               Add a Review
            </button>
   )
};