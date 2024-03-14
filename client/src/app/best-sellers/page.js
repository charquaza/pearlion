import ProductListCard from '@/app/_components/ProductListCard';
import earringImageList from '@/app/_images/earringImageList'
import necklaceImageList from '@/app/_images/necklaceImageList';
import styles from '@/app/_styles/bestSellersPage.module.css';

export default function BestSellersPage() {
   return (
      <main className={styles['best-sellers-page']}>
         <h1>Best Sellers</h1>

         <ul>
            {earringImageList.map(earring => {
               return earring.status === 'bestseller' 
                  ?
                     <li key={earring.id}>
                        <ProductListCard product={earring} />
                     </li>
                  : null;
            })}

            {necklaceImageList.map(necklace => {
               return necklace.status === 'bestseller'
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
