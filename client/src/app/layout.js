import { 
  Source_Sans_3, Hi_Melody, Mali, The_Girl_Next_Door, Bubbler_One 
} from 'next/font/google';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import Footer from './_components/Footer';
import '@/app/_styles/globals.css';

export const metadata = {
  title: "Pearlion",
  description: "Jewelry shop",
};

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
    <html lang="en-US" className={mali.className}>
      <body>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
