import ProductListCard from '@/app/_components/ProductListCard';
import earringImageList from '@/app/_images/earringImageList'
import necklaceImageList from '@/app/_images/necklaceImageList';
import styles from '@/app/_styles/salePage.module.css';

export default function SalePage() {
   return (
      <main className={styles['sale-page']}>
         <h1>Sale</h1>

         <ul>
            {earringImageList.map(earring => {
               return earring.status === 'sale' 
                  ?
                     <li key={earring.id}>
                        <ProductListCard product={earring} />
                     </li>
                  : null;
            })}

            {necklaceImageList.map(necklace => {
               return necklace.status === 'sale'
                  ?
                     <li key={necklace.id}>
                        <ProductListCard product={necklace} />
                     </li>
                  : null;
            })}
         </ul>
      </main>
   );
};
