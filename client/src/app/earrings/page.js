import ProductListCard from '@/app/_components/ProductListCard';
import earringImageList from '@/app/_images/earringImageList';
import styles from '@/app/_styles/earringsPage.module.css';

export default function EarringsPage() {
   return (
      <main className={styles['earrings-page']}>
         <h1>Earrings</h1>

         <ul>
            {earringImageList.map(earring => {
               return (
                  <li key={earring.id}>
                     <ProductListCard product={earring} />
                  </li>
               );
            })}
         </ul>
      </main>
   );
};
