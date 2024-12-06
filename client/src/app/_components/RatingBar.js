import styles from '@/app/_styles/RatingBar.module.css';

export default function RatingBar({ reviewCount, ratingSum, context }) {
   var rating = (reviewCount && reviewCount !== 0)
      ? (ratingSum / reviewCount).toFixed(1)
      : 0.0;

   return (
      <div 
         className={
            styles['rating-container'] + (context ? ' ' + styles[context] : '')
         }
      >
         {
            <>
               <div 
                  className={styles['rating-bar']} 
                  style={{'--rating': rating}}
                  aria-label={
                     `Product rating is ${rating} out of 5.`
                  }
               >
                  <div className={styles['filled']}></div>
               </div>

               {
                  (context !== 'review-card' && rating !== 0) &&
                     <p className={styles['rating']}>
                        {rating}
                     </p>
               }
            </>
         }
      </div>
   );
};