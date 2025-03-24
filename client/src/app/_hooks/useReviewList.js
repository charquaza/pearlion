import useSWR from 'swr';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function useReviewList(productId, images) {
   let urlParams = new URLSearchParams({
      ...(productId && { productId }),
      ...(images && { images })
   });

   let requestURL = new URL('reviews', apiURL);
   requestURL.search = urlParams.toString();
   requestURL = requestURL.toString();

   const { data, error, isLoading, mutate } = useSWR(
      requestURL, 
      async url => {
         const fetchOptions = {
            method: 'GET',
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };

         const res = await fetch(url, fetchOptions);
         const data = await res.json();

         if (data.errors) {
            let error = new Error('Error occurred while fetching review data');
            error.info = data.errors;
            error.status = res.status;
            throw error;
         } else {
            return data;
         }
      }, 
      { errorRetryCount: 3, revalidateOnFocus: false }
   );

   return { 
      reviewList: data, 
      error, 
      isLoading, 
      mutate 
   };
};