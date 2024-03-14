import Image from 'next/image';
import styles from '@/app/_styles/SlideshowCard.module.css';

export default function SlideshowCard({ product }) {
   return (
      <article className={styles['slideshow-card']}>
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