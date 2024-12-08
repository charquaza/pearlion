'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/_styles/Sidebar.module.css';

export default function Sidebar() {
   const [ menuOpen, setMenuOpen ] = useState(false);
   const pathname = usePathname();

   function handleMenuToggle(e) {
      setMenuOpen(prev => !prev);
   }

   return (
      <nav className={styles.sidebar}>
         {menuOpen 
            ?
               <button className={styles['menu-icon-close']} onClick={handleMenuToggle}
                  aria-label='Close Menu'
               >&#x2715;</button>
            :
               <button className={styles['menu-icon-open']} onClick={handleMenuToggle}
                  aria-label='Open Menu'
               >&equiv;</button>
         }
      
         <ul className={
            menuOpen ? styles['nav-list'] : (styles['nav-list'] + ' ' + styles['mobile-hidden']) 
         }>
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