import Link from 'next/link';
import Image from 'next/image';
import Topbar from '@/app/_components/Topbar';
import logo from '@/app/_images/logo.png';
import styles from '@/app/_styles/Header.module.css';

export default function Header() {
   return (
      <header className={styles.header}>
         <Link href='/'>
            <Image 
               src={logo} 
               alt='The app logo: Pearlion' 
               quality={100}
               sizes='50vw'
               className={styles.logo}
               priority
            />
         </Link>         
      
         <Topbar />
      </header>
   );
}