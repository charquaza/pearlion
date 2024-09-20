import { useState } from 'react';
import Image from 'next/image';
import { isValidImageType, formatFileSize } from '../_utils/utils';
import { apiURL } from '@/root/config';
import styles from '@/app/_styles/NewReviewForm.module.css';

export default function NewReviewForm({ product }) {
   const [ showReviewForm, setShowReviewForm ] = useState(false);
   const [ inputValues, setInputValues ] = useState({ rating: '0', review: '' });
   const [ uploadPreview, setUploadPreview ] = useState([]);
   const [ formErrors, setFormErrors ] = useState([]);

   function toggleReviewForm(e) {
      setInputValues({ rating: '0', review: '' });
      setUploadPreview([]);
      setFormErrors([]);
      setShowReviewForm(prev => !prev);
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function handleUpload(e) {
      const currFiles = e.target.files;

      if (currFiles.length === 0) {
         setUploadPreview([]);
      } else {
         let newUploadPreview = [];

         for (const file of currFiles) {
            let previewInfo = {};

            if (isValidImageType(file)) {
               previewInfo.text = `${file.name} (${formatFileSize(file.size)})`;
               previewInfo.imgSrc = URL.createObjectURL(file);
               previewInfo.imgAlt = file.name;
            } else {
               previewInfo.text = `'${file.name}' is not a valid image, please choose a
                  different image`;
            }

            newUploadPreview.push(previewInfo);
         }

         setUploadPreview(newUploadPreview);
      }
   }

   async function handleFormSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      // remove hard-coded productID after testing
      formData.append('productId', '3a1f6246-4230-4023-9ea6-1fc72731733e');
      //formData.append('productId', product.id);
      
      const fetchOptions = {
         method: 'POST',
         body: formData,
         mode: 'cors',
         credentials: 'include',
         cache: 'no-store'
      }
      const fetchURL = apiURL + '/reviews';

      try {
         let res = await fetch(fetchURL, fetchOptions);

         if (res.ok) {
            setInputValues({ rating: '0', review: '' });
            setUploadPreview([]); 
            setFormErrors([]);     
            setShowReviewForm(false);
         } else {
            let data = await res.json();
            setFormErrors(data.errors);
         }
      } catch (e) {
         setFormErrors(e.errors || e);
      }
   }

   return (
      showReviewForm
         ? 
            <form className={styles['new-review-form']}
               encType='multipart/form-data'
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

               {
                  formErrors.length > 0 &&
                     <ul className={styles['form-errors']}>
                        {formErrors.map(errMsg => <li key={errMsg}>{errMsg}</li>)}
                     </ul>
               }

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
                     onChange={handleInput} required
                  />
               </label>

               <label className={styles['file-upload-label']}>
                  Add Images
                  <input 
                     type='file' name='images'
                     accept='image/apng, image/avif, image/gif, 
                        image/jpeg, image/png, image/svg+xml, 
                        image/webp' 
                     multiple 
                     onChange={handleUpload}
                  />
               </label>

               <ul className={styles['file-upload-list']}>
                  {
                     uploadPreview.map(info => {
                        return (
                           <li key={info.text}>
                              <div className={styles['file-upload-image-ctnr']}>
                                 {
                                    (info.imgSrc && info.imgAlt) &&
                                       <Image
                                          src={info.imgSrc}
                                          alt={info.imgAlt}
                                          fill
                                          quality={50}
                                          sizes='10vw'
                                       />
                                 }
                              </div>

                              <p>{info.text}</p>
                           </li>
                        );
                     })
                  }
               </ul>

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