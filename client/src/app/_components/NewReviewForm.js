'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { isValidImageType, formatFileSize } from '../_utils/utils';
import { apiURL } from '@/root/config';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/NewReviewForm.module.css';

export default function NewReviewForm({ product, revalidateProduct, revalidateReviewList }) {
   const [ showReviewForm, setShowReviewForm ] = useState(false);
   const [ inputValues, setInputValues ] = useState({ rating: '0', review: '' });
   const [ imgUploads, setImgUploads ] = useState([]);
   const [ formErrors, setFormErrors ] = useState([]);

   const productImageURL = useMemo(() => {
      let imgBuffer = product.data.Images[0].data.data;
      let uint8Array = new Uint8Array(imgBuffer);
      let imgBlob = new Blob([ uint8Array ], { type: 'image/jpeg' });
      let imgURL = URL.createObjectURL(imgBlob);
      
      return imgURL;
   }, [ product ]);

   function toggleReviewForm(e) {
      setInputValues({ rating: '0', review: '' });
      setImgUploads([]);
      setFormErrors([]);
      setShowReviewForm(prev => !prev);
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function handleUpload(e) {
      const fileInputElem = e.target;
      const currFiles = fileInputElem.files;

      if (currFiles.length !== 0) {
         let currFilesArray = [ ...currFiles ];
         let newImgFiles = currFilesArray.filter(newImgFile => {
            let fileIsNew = -1 === imgUploads.findIndex(imgUpload => {
               let isSameFile = (
                  newImgFile.name === imgUpload.name &&
                  newImgFile.size === imgUpload.size &&
                  newImgFile.lastModified === imgUpload.lastModified &&
                  newImgFile.webkitRelativePath === imgUpload.webkitRelativePath
               );
               return isSameFile;
            });
            
            return (
               isValidImageType(newImgFile) && fileIsNew
            );
         });

         setImgUploads([ ...imgUploads, ...newImgFiles ]);

         //clear <input> value to prevent bugs -
         //    <input type='file> cannot be a fully controlled component
         // e.g. w/o resetting <input>.value, user cannot 
         //    delete then immediately re-upload the same file,
         //    since the same file is still stored in the <input> 
         //    and therefore will not trigger onChange event
         fileInputElem.value = '';
      }
   }

   function handleUploadDelete(e) {
      const fileInputElem = e.target;
      const indexToDelete = Number(fileInputElem.getAttribute('data-upload-index'));

      setImgUploads([ 
         ...imgUploads.slice(0, indexToDelete), 
         ...imgUploads.slice(indexToDelete + 1) 
      ]);

      fileInputElem.value = '';
   }

   async function handleFormSubmit(e) {
      e.preventDefault();

      const formData = new FormData();

      imgUploads.forEach(imgFile => formData.append('images', imgFile));
      Object.keys(inputValues).forEach(key => formData.append(key, inputValues[key]));
      formData.append('productId', product.data.id);
      
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
            setImgUploads([]);
            setFormErrors([]);     
            setShowReviewForm(false);

            //update Product (avg ratings + review count), Review list 
            // to account for new review
            revalidateProduct();
            revalidateReviewList();
         } else {
            let data = await res.json();
            setFormErrors(data.errors);
         }
      } catch (e) {
         setFormErrors([ e.message ]);
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
                        src={productImageURL}
                        placeholder={prodImgPlaceholder}
                        alt={product.data.name}
                        fill={true}
                        quality={100}
                        sizes='10vw'
                        priority={true}
                     />
                  </div>

                  <p className={styles['product-name']}>
                     {product.data.name}
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
                     imgUploads.map((imgUpload, index) => {
                        let uploadtext = `${imgUpload.name} (${formatFileSize(imgUpload.size)})`;
                        let imgSrc = URL.createObjectURL(imgUpload);
                        let imgAlt = imgUpload.name;

                        return (
                           <li key={uploadtext}>
                              <button data-upload-index={index}
                                 onClick={handleUploadDelete}
                              >
                                 x
                              </button>

                              <div className={styles['file-upload-image-ctnr']}>
                                 {
                                    (imgSrc && imgAlt) &&
                                       <Image
                                          src={imgSrc}
                                          alt={imgAlt}
                                          fill
                                          quality={50}
                                          sizes='10vw'
                                       />
                                 }
                              </div>

                              <p>{uploadtext}</p>
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