import useSWR from 'swr';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function useUser() {
   const { data, error, isLoading, mutate } = useSWR(
      apiURL + '/users/curr-user', 
      url => {
         const fetchOptions = {
            method: 'GET',
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
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