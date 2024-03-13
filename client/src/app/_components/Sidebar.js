import Link from 'next/link';
import styles from '@/app/_styles/Sidebar.module.css';

export default function Sidebar() {
   return (
      <nav className={styles.sidebar}>
         <ul className={styles['nav-list']}>
            <li><Link href='/about-us'>About Us</Link></li>
            <li><Link href='/new-arrivals'>New Arrivals</Link></li>
            <li><Link href='/best-sellers'>Best Sellers</Link></li>
            <li><Link href='/earrings'>Earrings</Link></li>
            <li><Link href='/necklaces'>Necklaces</Link></li>
            <li><Link href='/sale'>Sale</Link></li>
         </ul>
      </nav>
   );   
}