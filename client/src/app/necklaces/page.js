import ProductListCard from '@/app/_components/ProductListCard';
import necklaceImageList from '@/app/_images/necklaceImageList';
import styles from '@/app/_styles/necklacesPage.module.css';

export default function NecklacesPage() {
   return (
      <main className={styles['necklaces-page']}>
         <h1>Necklaces</h1>

         <ul>
            {necklaceImageList.map(necklace => {
               return (
                  <li key={necklace.id}>
                     <ProductListCard product={necklace} />
                  </li>
               );
            })}
         </ul>
      </main>
   );
};
