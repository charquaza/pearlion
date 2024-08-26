import Link from 'next/link';

export default function NotFound() {
   return (
      <main>
         <h1>Sorry</h1> 
         <p>We couldn't find what you're looking for...</p>
         <Link href='/'>Return Home</Link>
      </main>
   );
}