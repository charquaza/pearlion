import { Quicksand } from 'next/font/google';
import CheckoutStatusProvider from './_contexts/CheckoutStatusProvider';
import Header from './_components/Header';
import Footer from './_components/Footer';
import '@/app/_styles/globals.css';

export const metadata = {
   title: "Pearlion",
   description: "Jewelry shop",
};

//logo - Eyesome Duo Script font

const quicksand = Quicksand({
   subsets: [ 'latin' ]
});

export default function RootLayout({ children }) {
   return (
      <html lang="en-US" className={quicksand.className}>
         <body>
            <CheckoutStatusProvider>
               <Header />
               {children}
               <Footer />
            </CheckoutStatusProvider>
         </body>
      </html>
   );
};
