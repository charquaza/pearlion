'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { isValidImageType, formatFileSize } from '../_utils/utils';
import { apiURL } from '@/root/config';
import prodImgPlaceholder from '../_images/prodImgPlaceholder';
import styles from '@/app/_styles/EditReviewForm.module.css';

export default function EditReviewForm({ 
   review, productName, toggleEditMode, revalidateProduct, revalidateReviewList 
}) {
   const [ inputValues, setInputValues ] = useState(
      { rating: String(review.rating), review: review.review }
   );
   const [ imgUploads, setImgUploads ] = useState([]);
   const [ deletedImages, setDeletedImages ] = useState(new Map());
   const [ formErrors, setFormErrors ] = useState([]);

   var imageList = useMemo(() => {
      return (
         review.Images.map((imgData, imageIndex) => {
            let imgBuffer = imgData.data.data;
            let uint8Array = new Uint8Array(imgBuffer);
            let imgBlob = new Blob([ uint8Array ], { type: 'image/jpeg' });
            let imgURL = URL.createObjectURL(imgBlob);

            return { id: imgData.id, imgURL };
         })
      );
   }, [review]);

   function handleEditCancel(e) {
      toggleEditMode();
   }

   function handleInput(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value });
   }

   function handlePrevImageDelete(e) {
      const imgToDelete = e.target.getAttribute('data-img-id');
      const newMap = new Map(deletedImages);
      newMap.set(imgToDelete, true);
      setDeletedImages(newMap);
   }

   function handlePrevImageRestore(e) {
      const imgToRestore = e.target.getAttribute('data-img-id');
      const newMap = new Map(deletedImages);
      newMap.delete(imgToRestore);
      setDeletedImages(newMap);
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

      imgUploads.forEach(imgFile => formData.append('newImages', imgFile));
      Object.keys(inputValues).forEach(key => formData.append(key, inputValues[key]));
      if (deletedImages.size > 0) {
         formData.append('deletedImages', JSON.stringify(Array.from(deletedImages.keys())));
      }
      formData.append('productId', review.product);
      
      const fetchOptions = {
         method: 'PUT',
         body: formData,
         mode: 'cors',
         credentials: 'include',
         cache: 'no-store'
      }
      const fetchURL = apiURL + '/reviews/' + review.id;

      try {
         let res = await fetch(fetchURL, fetchOptions);

         if (res.ok) {
            setInputValues({ rating: '0', review: '' });
            setImgUploads([]);
            setDeletedImages(new Map());
            setFormErrors([]);

            //update Product (avg ratings + review count), Review list 
            // to account for updated review
            revalidateProduct();
            revalidateReviewList();

            toggleEditMode();
         } else {
            let data = await res.json();
            setFormErrors(data.errors);
         }
      } catch (e) {
         setFormErrors([ e.message ]);
      }
   }

   return (
      <form className={styles['edit-review-form']}
         encType='multipart/form-data'
         onSubmit={handleFormSubmit}
      >
         <h3>Your Review for: {productName}</h3>

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

         <ul className={styles['prev-image-list']}>
            {
               imageList.map((imageDetails) => {
                  const imgMarkedForDelete = deletedImages.has(imageDetails.id);

                  return (
                     <li 
                        key={imageDetails.id}
                        className={styles[imgMarkedForDelete ? 'deleted' : '']}
                     >
                        <Image
                           src={imageDetails.imgURL}
                           placeholder={prodImgPlaceholder}
                           alt={imgMarkedForDelete 
                              ? 
                                 'marked for delete - image uploaded with review'
                              :
                                 'image uploaded with review'
                           }
                           fill={true}
                           quality={100}
                           sizes='50vw'
                        />

                        {imgMarkedForDelete
                           ? 
                              <button 
                                 type='button'
                                 data-img-id={imageDetails.id}
                                 onClick={handlePrevImageRestore}
                              >
                                 Restore
                              </button>
                           :
                              <button 
                                 type='button'
                                 data-img-id={imageDetails.id}
                                 onClick={handlePrevImageDelete}
                              >
                                 x
                              </button>
                        }
                     </li>
                  );
               })
            } 
         </ul>

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
                        <button 
                           type='button'
                           data-upload-index={index}
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

         <button type='submit'>Save</button>
         <button type='button' onClick={handleEditCancel}>Discard Changes</button>
      </form>
   );
};