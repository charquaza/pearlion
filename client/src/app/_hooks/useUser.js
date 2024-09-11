import useSWR from 'swr';
import { apiURL } from '@/root/config'; 

export default function useUser() {
   const { data, error, isLoading, mutate } = useSWR(
      apiURL + '/users/curr-user', 
      url => {
         const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-store'
         };

         return fetch(url, fetchOptions).then(res => res.json());
      }, 
      { shouldRetryOnError: false }
   );

   return { 
      user: data, 
      error, 
      isLoading, 
      mutate 
   };
};