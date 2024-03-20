import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/_styles/SlideshowCard.module.css';

export default function SlideshowCard({ product }) {
   return (
      <article className={styles['slideshow-card']}>
         <div className={styles['image-container']}>
            <Image 
               src={product.images[0]} 
               alt={product.name}
               quality={100}
               sizes='50vw'         
            />
         </div>

         <h2>
            <Link 
               href={`/${product.category}/${product.id}`}
               className={styles['products-link']}
            >
               {product.name}
            </Link>
         </h2>
         
         <p>
            ☆☆☆☆☆&nbsp; 
            <Link 
               href={`/${product.category}/${product.id}#reviews`}
               className={styles['reviews-link']}
            >
               Reviews
            </Link>
         </p>
      </article>
   );
};