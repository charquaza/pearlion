'use client';

import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Libre_Baskerville, Quicksand, Courgette } from 'next/font/google';
import Link from 'next/link';
import CheckoutStatusContext from '../_contexts/CheckoutStatusContext';
import styles from '@/app/_styles/Sidebar.module.css';

const courgette = Courgette({
   weight: [ '400' ],
   subsets: [ 'latin' ]
});
const quicksand = Quicksand({
   subsets: [ 'latin' ]
});
const libreBaskerville = Libre_Baskerville({
   weight: [ '400', '700' ],
   style: [ 'italic' ],
   subsets: [ 'latin' ]
});

export default function Sidebar() {
   const pathname = usePathname();
   const { inCheckout } = useContext(CheckoutStatusContext);

   if (inCheckout) {
      return null;
   }

   return (
      <nav className={quicksand.className + ' ' + styles.sidebar}>
         <ul className={styles['nav-list']}>
            <li>
               <Link href='/about-us' 
                  className={pathname === '/about-us' ? styles['current-route'] : undefined}
               >About Us</Link>
            </li>
            <li>
               <Link href='/new-arrivals'
                  className={pathname === '/new-arrivals' ? styles['current-route'] : undefined}
               >New Arrivals</Link>
            </li>
            <li>
               <Link href='/best-sellers'
                  className={pathname === '/best-sellers' ? styles['current-route'] : undefined}
               >Best Sellers</Link>
               </li>
            <li>
               <Link href='/earrings'
                  className={pathname === '/earrings' ? styles['current-route'] : undefined}
               >Earrings</Link>
            </li>
            <li>
               <Link href='/necklaces'
                  className={pathname === '/necklaces' ? styles['current-route'] : undefined}
               >Necklaces</Link>
            </li>
            <li>
               <Link href='/sale'
                  className={pathname === '/sale' ? styles['current-route'] : undefined}
               >Sale</Link>
            </li>
         </ul>
      </nav>
   );   
};