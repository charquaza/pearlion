import e1_1 from './earrings/blue-earrings-1.jpg';
import e1_2 from './earrings/blue-earrings-2.jpg';
import e1_3 from './earrings/blue-earrings-3.jpg';
import e2_1 from './earrings/diamond-cluster-earrings-1.jpg';
import e2_2 from './earrings/diamond-cluster-earrings-2.jpg';
import e2_3 from './earrings/diamond-cluster-earrings-3.jpg';
import e2_4 from './earrings/diamond-cluster-earrings-4.jpg';
import e2_5 from './earrings/diamond-cluster-earrings-5.jpg';
import e2_6 from './earrings/diamond-cluster-earrings-6.jpg';
import e2_7 from './earrings/diamond-cluster-earrings-7.jpg';
import e3_1 from './earrings/diamond-earrings-1.jpg';
import e3_2 from './earrings/diamond-earrings-2.jpg';
import e3_3 from './earrings/diamond-earrings-3.jpg';
import e4_1 from './earrings/emerald-flower-earrings-1.jpg';
import e4_2 from './earrings/emerald-flower-earrings-2.jpg';
import e4_3 from './earrings/emerald-flower-earrings-3.jpg';
import e5_1 from './earrings/gold-earrings-1.jpg';
import e5_2 from './earrings/gold-earrings-2.jpg';
import e6_1 from './earrings/gold-twist-earrings-1.jpg';
import e6_2 from './earrings/gold-twist-earrings-2.jpg';
import e6_3 from './earrings/gold-twist-earrings-3.jpg';
import e7_1 from './earrings/pearl-circle-earrings-1.jpg';
import e7_2 from './earrings/pearl-circle-earrings-2.jpg';
import e8_1 from './earrings/pearl-earrings-1.jpg';
import e8_2 from './earrings/pearl-earrings-2.jpg';
import e8_3 from './earrings/pearl-earrings-3.jpg';
import e9_1 from './earrings/silver-blue-flower-earrings-1.jpg';
import e9_2 from './earrings/silver-blue-flower-earrings-2.jpg';
import e9_3 from './earrings/silver-blue-flower-earrings-3.jpg';
import e10_1 from './earrings/turtle-earrings-1.jpg';
import e10_2 from './earrings/turtle-earrings-2.jpg';
import e10_3 from './earrings/turtle-earrings-3.jpg';

const earrings = [
   { 
      id: 'e1', name: 'Blue Earrings', category: 'earrings', images: [ e1_1, e1_2, e1_3 ], price: 30, 
      quantityInStock: 10, status: 'sale',
      description: 'Blue earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e2', name: 'Diamond Cluster Earrings', category: 'earrings', images: [ e2_1, e2_2, e2_3, e2_4, e2_5, e2_6, e2_7 ], price: 250, 
      quantityInStock: 3, status: '',
      description: 'Diamond Cluster earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e3', name: 'Diamond Earrings', category: 'earrings', images: [ e3_1, e3_2, e3_3 ], price: 500, 
      quantityInStock: 1, status: '',
      description: 'Diamond earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e4', name: 'Emerald Flower Earrings', category: 'earrings', images: [ e4_1, e4_2, e4_3 ], price: 85, 
      quantityInStock: 2, status: 'sale',
      description: 'Emerald Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e5', name: 'Gold Earrings', category: 'earrings', images: [ e5_1, e5_2 ], price: 50, 
      quantityInStock: 15, status: 'bestseller',
      description: 'Gold earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e6', name: 'Gold Twist Earrings', category: 'earrings', images: [ e6_1, e6_2, e6_3 ], price: 120, 
      quantityInStock: 8, status: 'new',
      description: 'Gold Twist earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
      ]
   }, 
   { 
      id: 'e7', name: 'Pearl Circle Earrings', category: 'earrings', images: [ e7_1, e7_2 ], price: 100, 
      quantityInStock: 14, status: '',
      description: 'Pearl Circle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e8', name: 'Pearl Earrings', category: 'earrings', images: [ e8_1, e8_2, e8_3 ], price: 50, 
      quantityInStock: 30, status: 'bestseller',
      description: 'Pearl earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e9', name: 'Silver Blue Flower Earrings', category: 'earrings', images: [ e9_1, e9_2, e9_3 ], price: 15, 
      quantityInStock: 9, status: 'bestseller',
      description: 'Silver Blue Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: '☆☆☆☆☆',
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'e10', name: 'Turtle Earrings', category: 'earrings', images: [ e10_1, e10_2, e10_3 ], price: 90, 
      quantityInStock: 6, status: 'new',
      description: 'Turtle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
      ]
   }
];

export default earrings;