'use client';

import Link from 'next/link';
import useProductList from '../_hooks/useProductList';
import ProductListCard from '@/app/_components/ProductListCard';
import styles from '@/app/_styles/earringsPage.module.css';

export default function EarringsPage() {
   const { productList, error } = useProductList('earrings', null, 'main');

   if (error) {
      console.error(error);

      return (
         <main className={styles['earrings-page']}>
            <h1>Earrings</h1>
            <p>Sorry, we&apos;re having trouble loading this page.</p>
            <p>Please try again later.</p>
         </main>
      );
   }

   return (
      <main className={styles['earrings-page']}>
         <h1>Earrings</h1>

         {
            (productList)
               ?
                  (productList.data.length > 0) 
                     ?
                        <ul>
                           {productList.data.map(product => {
                              return (
                                 <li key={product.id}>
                                    <ProductListCard product={product} />
                                 </li>
                              );
                           })}
                        </ul>
                     :
                        <>
                           <p>No products in this category</p>
                           <Link href='/'>Continue Shopping</Link>
                        </> 
               :
                  <ProductListCard />
         }
      </main>
   );
};
