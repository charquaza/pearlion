import styles from '@/app/_styles/RatingBar.module.css';

export default function RatingBar({ reviewCount, ratingSum, context }) {
   var rating = reviewCount !== 0 
      ? (ratingSum / reviewCount).toFixed(1)
      : null;

   return (
      <div 
         className={
            styles['rating-container'] + (context ? ' ' + styles[context] : '')
         }
      >
         {
            rating !== null
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

                     <p className={styles['rating']}>
                        {rating}
                     </p>
                  </>
               :
                  <p className={styles['no-rating']}>
                     {'(Not yet rated)'}
                  </p>
         }
      </div>
   );
};