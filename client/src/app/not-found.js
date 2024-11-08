import Link from 'next/link';

export default function NotFound() {
   return (
      <main>
         <h1>Sorry</h1> 
         <p>We couldn&apos;t find what you&apos;re looking for...</p>
         <Link href='/'>Return Home</Link>
      </main>
   );
}