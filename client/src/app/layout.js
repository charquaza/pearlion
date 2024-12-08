import { 
   Source_Sans_3, Hi_Melody, Mali, The_Girl_Next_Door, Bubbler_One,
   Bitter,
   Noto_Serif,
   Libre_Baskerville,
   Tangerine,
   Birthstone,
   Charm,
   Source_Serif_4,
   Quicksand
} from 'next/font/google';
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
const tangerine = Tangerine({
   weight: [ '400', '700' ],
   subsets: ['latin']
});
const sourceSans3 = Source_Sans_3({
   subsets: ['latin']
});
const hiMelody = Hi_Melody({
   weight: '400',
   subsets: ['latin']
});
const mali = Mali({
   weight: '400',
   subsets: ['latin']
});
const theGirlNextDoor = The_Girl_Next_Door({
   weight: '400',
   subsets: ['latin']
});
const bubblerOne = Bubbler_One({
   weight: '400',
   subsets: ['latin']
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
