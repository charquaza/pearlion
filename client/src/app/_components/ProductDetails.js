import Link from 'next/link';
import ProductImageList from './ProductImageList';
import PurchaseControls from './PurchaseControls';
import ReviewCard from './ReviewCard';
import styles from '@/app/_styles/ProductDetails.module.css';

export default function ProductDetails({ product }) {
   return (
      <main className={styles['main-page']}>
         <div className={styles['images-description-container']}>
            <ProductImageList product={product} />
   
            <div className={styles['description-container']}>
               <h1>{product.name}</h1>
               <p>{product.description}</p>
               <p>☆☆☆☆☆ <Link href='#reviews'>Reviews</Link></p>
               <p><span className={styles['bold']}>Price:</span> ${product.price}</p>
               
               <PurchaseControls productId={product.id} />
            </div>
         </div>

         <section className={styles['product-details']}>
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

         <article className={styles['reviews']}>
            <h2 id='reviews'>Reviews</h2>
            <p>☆☆☆☆☆</p>
            <p>(--insert review image list here--)</p>

            <button>Add a Review</button>

            <ul>
               {
                  product.reviews.length > 0
                     ? 
                        product.reviews.map((review, index) => {
                           return (
                              <li key={index}>
                                 <ReviewCard product={product} review={review} />
                              </li>
                           );
                        })
                     : <li>No reviews</li>
               }
            </ul>
            <p>(--insert review pagination here--)</p>
         </article>
      </main>
   );
};