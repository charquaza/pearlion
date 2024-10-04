import useSWR from 'swr';
import { apiURL } from '@/root/config'; 

export default function useProductList(category, status, images, cartProductIds) {
   let urlParams = new URLSearchParams({
      ...(category && { category }),
      ...(status &&
         (Array.isArray(status)
            ? { status: status.join(',') }
            : { status })
      ),
      ...(images && { images }),
      ...(cartProductIds && 
         { 
            productIds: Array.from(cartProductIds.keys()).join(',')
         }
      )
   });

   let requestURL = new URL('products', apiURL);
   requestURL.search = urlParams.toString();
   requestURL = requestURL.toString();

   const { data, error, isLoading, mutate } = useSWR(
      requestURL, 
      async url => {
         const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };

         const res = await fetch(url, fetchOptions);
         const data = await res.json();

         if (data.errors) {
            let error = new Error('Error occurred while fetching product data');
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
      productList: data, 
      error, 
      isLoading, 
      mutate 
   };
};