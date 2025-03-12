'use client';

import { useState } from 'react';
import useProductList from './_hooks/useProductList';
import SlideshowCard from './_components/SlideshowCard';
import ProductListCard from './_components/ProductListCard';
import styles from './_styles/homePage.module.css';

export default function HomePage() {
   const [ slideshow, setSlideshow ] = useState(
      new Map([ ['startIndex', 0], ['count', 4] ])
   );

   const { productList, error } = useProductList(null, ['new', 'bestseller'], 'main');

   if (error) {
      console.error(error);

      return (
         <main className={styles['home-page-error']}>
            <p>Sorry, we&apos;re having trouble loading this page.</p>
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
      if (e.target.getAttribute('data-nav') === 'previous') {
         let previousIndex = slideshow.get('startIndex') - 1;
         if (previousIndex === -1) {
            previousIndex = newArrivals.length - 1;
         }
         setSlideshow(new Map([ ...slideshow, ['startIndex', previousIndex] ]));
      } else if (e.target.getAttribute('data-nav') === 'next') {
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
            <main className={styles['home-page']}>
               <article className={styles['new-arrivals']}>
                  <h2>New Arrivals</h2>

                  <div className={styles['slideshow-container']}>
                     <ul>
                        <li>
                           <button 
                              onClick={handleSlideshowNavigation}
                              data-nav='previous'
                           > &lt; </button>
                        </li>
                        {
                           currSlideshowList.map(product => {
                              return (
                                 <li key={product.id}>
                                    <SlideshowCard product={product} />
                                 </li>
                              );
                           })
                        }
                        <li>
                           <button 
                                 onClick={handleSlideshowNavigation}
                                 data-nav='next'
                           > &gt; </button>
                        </li>
                     </ul>
         
                     <div 
                        className={styles['bottom-slideshow-nav']} 
                        onClick={handleSlideshowNavigation}
                     >
                        <button data-nav='previous'> &lt; </button>
                        <button data-nav='next'> &gt; </button>
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
            <main className={styles['home-page-loading']}>
               <p>Loading...</p>
            </main>
   );
};
