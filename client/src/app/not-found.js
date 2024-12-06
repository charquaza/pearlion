import Link from 'next/link';
import styles from './_styles/notFoundPage.module.css';

export default function NotFound() {
   return (
      <main className={styles['not-found-page']}>
         <h1>Sorry</h1> 
         <p>We couldn&apos;t find what you&apos;re looking for...</p>
         <Link href='/'>Return Home</Link>
      </main>
   );
}