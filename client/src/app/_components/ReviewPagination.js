import styles from '@/app/_styles/ReviewPagination.module.css';

export default function ReviewPagination({ 
   product, reviewsPerPage, setReviewsPerPage, 
   currPage, setCurrPage  
}) {
   var totalPages = Math.ceil(product.reviews.length / reviewsPerPage);
   var pageNumbers = [];
   
   if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
         pageNumbers.push(i);
      }
   } else {
      switch (currPage) {
         case 1:
         case 2:
            pageNumbers = [1, 2, 3, '...', totalPages];
            break;
         case 3:
            pageNumbers = [1, 2, 3, 4, '...', totalPages];
            break;
         case totalPages - 2:
            pageNumbers = [1, '...', currPage - 1, currPage, currPage + 1, totalPages];
            break;
         case totalPages - 1:
            pageNumbers = [1, '...', currPage - 1, currPage, totalPages];
            break;
         case totalPages:
            pageNumbers = [1, '...', currPage - 2, currPage - 1, currPage];
            break;
         default:
            pageNumbers = [1, '...', currPage - 1, currPage, currPage + 1, '...', totalPages];
      }
   }

   function handleNavigationReviews(e) {
      switch (e.target.dataset.id) {
         case undefined:
            break;
         case 'previous':
            setCurrPage(prev => Math.max(prev - 1, 1));
            break;
         case 'next':
            setCurrPage(prev => Math.min(prev + 1, totalPages));
            break;
         default:
            setCurrPage(Number(e.target.dataset.id));
      }
   }

   function handleChangePageSizeReviews(e) {
      //debugger;
      var updatedReviewsPerPage = Number(e.target.value);

      if (updatedReviewsPerPage * (currPage - 1) >= product.reviews.length) {
         let totalPages = Math.ceil(product.reviews.length / updatedReviewsPerPage);
         setCurrPage(totalPages);
      }   

      setReviewsPerPage(updatedReviewsPerPage);
   }

   return (
      <div className={styles['review-pagination']}>
         {
            product.reviews.length > 0 &&
               <>
                  <div className={styles['reviews-per-page']}>
                     <label>
                        Reviews per Page:&nbsp;
                        <select value={reviewsPerPage}
                           onChange={handleChangePageSizeReviews}
                        >
                           {
                              <option value='5'>5</option>
                           }
                           {
                              product.reviews.length > 5 &&
                                 <option value='10'>10</option>
                           }
                           {
                              product.reviews.length > 10 &&
                                 <option value='15'>15</option>
                           }
                           {
                              product.reviews.length > 15 &&
                                 <option value='20'>20</option>
                           }
                        </select>
                     </label>
                  </div>

                  <ul className={styles['pages-list']}
                     onClick={handleNavigationReviews}
                  >
                     <li>
                        <button disabled={currPage === 1}
                           data-id={'previous'}
                        >&lt;</button>
                     </li>
                     
                     {
                        pageNumbers.map((page, index) => {
                           return (
                              page === '...'
                                 ?
                                    <li key={index * -1}>...</li>
                                 :
                                    <li key={page}>
                                       <button disabled={currPage === page}
                                          data-id={page}
                                       >{page}</button>
                                    </li>
                           );
                        })
                     }

                     <li>
                        <button disabled={currPage === totalPages}
                           data-id={'next'}
                        >&gt;</button>
                     </li>
                  </ul>
               </>
         }
      </div>
   );
};