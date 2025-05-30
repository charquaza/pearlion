'use client';

import Link from 'next/link';
import useProductList from '../_hooks/useProductList';
import ProductListCard from '@/app/_components/ProductListCard';
import styles from '@/app/_styles/newArrivalsPage.module.css';

export default function NewArrivalsPage() {
   const { productList, error } = useProductList(null, 'new', 'main');

   if (error) {
      console.error(error);

      return (
         <main className={styles['new-arrivals-page']}>
            <h1>New Arrivals</h1>
            <p>Sorry, we&apos;re having trouble loading this page.</p>
            <p>Please try again later.</p>
         </main>
      );
   }

   return (
      <main className={styles['new-arrivals-page']}>
         <h1>New Arrivals</h1>

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
