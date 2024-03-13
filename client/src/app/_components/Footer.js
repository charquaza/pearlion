import styles from '@/app/_styles/Footer.module.css';

export default function Footer() {
   var currDate = new Date();

   return (
      <footer className={styles.footer}>
         <p className={styles.copyright}>Copyright &copy; {currDate.getFullYear()} Pearlion</p>
      </footer>
   );
};