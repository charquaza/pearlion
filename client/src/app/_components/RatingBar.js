import styles from '@/app/_styles/RatingBar.module.css';

export default function RatingBar({ reviewCount, ratingSum, context }) {
   var rating = (reviewCount && reviewCount !== 0)
      ? (ratingSum / reviewCount).toFixed(1)
      : null;

   return (
      <div 
         className={
            styles['rating-container'] + (context ? ' ' + styles[context] : '')
         }
      >
         {
            (rating !== null && rating !== 0)
               ?
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
                        context !== 'review-card' &&
                           <p className={styles['rating']}>
                              {rating}
                           </p>
                     }
                  </>
               :
                  <p className={styles['no-rating']}>
                     {'(Not yet rated)'}
                  </p>
         }
      </div>
   );
};