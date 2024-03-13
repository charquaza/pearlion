import Link from 'next/link';
import styles from '@/app/_styles/Topbar.module.css';

export default function Topbar() {
   return (
      <nav className={styles.topbar}>
         <ul className={styles['nav-list']}>
            <li>
               <Link href='/'>Log In</Link>
            </li>
            <li>
               <Link href='/'>Sign Up</Link>
            </li>
            <li>
               <Link href='/'>Cart</Link>
            </li>
         </ul>
      </nav>
   );
}