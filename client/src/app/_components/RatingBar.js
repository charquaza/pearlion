import styles from '@/app/_styles/RatingBar.module.css';

export default function RatingBar({ reviews, context }) {
   var rating = reviews.length > 0 
      ?
         (
            reviews.reduce((prev, curr) => prev + curr.rating, 0) / 
            reviews.length
         ).toFixed(1)
      : '0.0';

   return (
      <div 
         className={
            styles['rating-container'] + (context ? ' ' + styles[context] : '')
         }
      >
         {
            rating !== '0.0' 
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