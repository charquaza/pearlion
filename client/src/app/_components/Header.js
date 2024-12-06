'use client';

import { useContext } from 'react';
import CheckoutStatusContext from '../_contexts/CheckoutStatusContext';
import Link from 'next/link';
import Image from 'next/image';
import Topbar from '@/app/_components/Topbar';
import logo2 from '@/app/_images/logo-2.png';
import styles from '@/app/_styles/Header.module.css';

export default function Header() {
   const { inCheckout } = useContext(CheckoutStatusContext);

   return (
      <header className={styles.header}>
         <div className={styles['logo-ctnr']}>
            {inCheckout
               ?
                  <Image 
                     src={logo2} 
                     alt='The app logo: Pearlion' 
                     quality={100}
                     sizes='50vw'
                     className={styles.logo}
                     priority
                  />
               :
                  <Link href='/'>
                     <Image 
                        src={logo2} 
                        alt='The app logo: Pearlion' 
                        quality={100}
                        sizes='50vw'
                        className={styles.logo}
                        priority
                     />
                  </Link>
            }
         </div>

         {!inCheckout && <Topbar />}
      </header>
   );
};