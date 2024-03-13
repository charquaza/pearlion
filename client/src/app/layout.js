import Header from './_components/Header';
import Sidebar from './_components/Sidebar';
import Footer from './_components/Footer';
import '@/app/_styles/globals.css';

export const metadata = {
  title: "Pearlion",
  description: "Jewelry shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
