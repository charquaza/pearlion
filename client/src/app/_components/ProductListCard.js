import Image from 'next/image';
import styles from '@/app/_styles/ProductListCard.module.css';

export default function ProductListCard({ product }) {
   return (
      <article className={styles['product-list-card']}>
         <Image 
            src={product.image}
            alt={product.name}
            quality={100}
            sizes='50vw'         
         />

         <h2>{product.name}</h2>
         <p>☆☆☆☆☆ Reviews</p>
      </article>
   );
};