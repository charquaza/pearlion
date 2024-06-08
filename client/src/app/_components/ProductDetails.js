import Link from 'next/link';
import ProductImageList from './ProductImageList';
import RatingBar from './RatingBar';
import PurchaseControls from './PurchaseControls';
import styles from '@/app/_styles/ProductDetails.module.css';

export default function ProductDetails({ product }) {
   return (
      <article className={styles['product-details']}>
         <div className={styles['images-description-container']}>
            <ProductImageList product={product} />
   
            <div className={styles['description-container']}>
               <h1>{product.name}</h1>
               <div className={styles['rating-and-reviews-link']}>
                  <RatingBar reviews={product.reviews} context={'product-details'} />
                  <Link href='#reviews'>Reviews</Link>
               </div>
               <p>{product.description}</p>
               <p><span className={styles['bold']}>Price:</span> ${product.price}</p>
               
               <PurchaseControls productId={product.id} />
            </div>
         </div>

         <section className={styles['details-section']}>
            <h2>Product Details</h2>

            <ul>
               <li>color: </li>
               <li>materials: </li>
               <li>dimensions: </li>
               <li>weight: </li>
            </ul>

            <p>
               Et molestie ac feugiat sed. Facilisis gravida neque convallis a. Donec adipiscing tristique risus nec feugiat in fermentum posuere. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Fringilla ut morbi tincidunt augue interdum. Dolor sit amet consectetur adipiscing elit duis tristique. Arcu non sodales neque sodales ut etiam. Sit amet facilisis magna etiam tempor orci eu lobortis. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Enim sed faucibus turpis in eu mi bibendum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et tortor consequat id porta nibh venenatis cras sed.
            </p>
         </section>
      </article>
   );
};