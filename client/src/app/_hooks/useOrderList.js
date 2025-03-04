import useSWR from 'swr';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function useOrderList() {
   let requestURL = new URL('orders', apiURL);
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
            let error = new Error('Error occurred while fetching orders');
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
      orderList: data, 
      error, 
      isLoading, 
      mutate 
   };
};