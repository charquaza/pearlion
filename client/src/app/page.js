'use client';

import { useState } from 'react';
import useProductList from './_hooks/useProductList';
import SlideshowCard from './_components/SlideshowCard';
import ProductListCard from './_components/ProductListCard';
import styles from './_styles/homePage.module.css';

export default function HomePage() {
   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 3] ])
   );

   const { productList, error } = useProductList(null, ['new', 'bestseller'], 'main');

   if (error) {
      console.error(error);

      return (
         <main>
            <p>Sorry, we're having trouble loading this page.</p>
            <p>Please try again later.</p>
         </main>
      );
   }

   if (productList) {
      var newArrivals = productList.data[1];
      var bestsellers = productList.data[0];
   
      var currSlideshowList = newArrivals; 
      if (currSlideshowList.length > slideshow.get('count')) {
         currSlideshowList = []; 
         for (
            let i = slideshow.get('startIndex'); 
            i < slideshow.get('startIndex') + slideshow.get('count'); 
            i++
         ) {
            if (i >= newArrivals.length) {
               currSlideshowList.push(newArrivals[ i - newArrivals.length ]);
            } else {
               currSlideshowList.push(newArrivals[i]);
            }
         }
      }   
   }

   function handleSlideshowNavigation(e) {
      if (e.target.id === 'previous') {
         let previousIndex = slideshow.get('startIndex') - 1;
         if (previousIndex === -1) {
            previousIndex = newArrivals.length - 1;
         }
         setSlideshow(new Map([ ...slideshow, ['startIndex', previousIndex] ]));
      } else if (e.target.id === 'next') {
         let nextIndex = slideshow.get('startIndex') + 1;
         if (nextIndex === newArrivals.length) {
            nextIndex = 0;
         }
         setSlideshow(new Map([ ...slideshow, ['startIndex', nextIndex] ]));
      } else {
         e.stopPropagation();
      }
   }

   return (
      (productList) 
         ?
            <main>
               <article className={styles['new-arrivals']}>
                  <h2>New Arrivals</h2>

                  <div className={styles['slideshow-container']}>
                     <ul>
                        {
                           currSlideshowList.map(product => {
                              return (
                                 <li key={product.id}>
                                    <SlideshowCard product={product} />
                                 </li>
                              );
                           })
                        }
                     </ul>
         
                     <div onClick={handleSlideshowNavigation}>
                        <button id='previous'> ← </button>
                        <button id='next'> → </button>
                     </div>
                  </div>
               </article>

               <article className={styles['best-sellers']}>
                  <h2>Best Sellers</h2>

                  <ul>
                     {
                        bestsellers.map(product => {
                           return (
                              <li key={product.id}>
                                 <ProductListCard product={product} />
                              </li>
                           );
                        })
                     }
                  </ul>
               </article>
            </main>
         :
            <main>
               <p>Loading...</p>
            </main>
   );
};
