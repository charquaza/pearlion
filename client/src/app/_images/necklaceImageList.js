import n1_1 from './necklaces/amethyst-necklace.jpg';
import n2_1 from './necklaces/emerald-necklace.jpg';
import n3_1 from './necklaces/flower-necklace.jpg';
import n4_1 from './necklaces/pearl-necklace.jpg';
import n5_1 from './necklaces/pink-stone-necklace.jpg';
import n6_1 from './necklaces/rain-drop-necklace.jpg';
import n7_1 from './necklaces/sapphire-necklace.jpg';
import n8_1 from './necklaces/scorpion-necklace.jpg';
import n9_1 from './necklaces/turquoise-stone-necklace.jpg';

const necklaces = [
   { 
      id: 'n1', name: 'Amethyst Necklace', category: 'necklaces', images: [ n1_1 ], price: 300, 
      quantityInStock: 4, status: '',
      description: 'Amethyst necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'n2', name: 'Emerald Necklace', category: 'necklaces', images: [ n2_1 ], price: 1000, 
      quantityInStock: 1, status: 'new',
      description: 'Emerald necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
      ]
   }, 
   { 
      id: 'n3', name: 'Flower Necklace', category: 'necklaces', images: [ n3_1 ], price: 100, 
      quantityInStock: 5, status: 'bestseller',
      description: 'Flower necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'n4', name: 'Pearl Necklace', category: 'necklaces', images: [ n4_1 ], price: 180, 
      quantityInStock: 8, status: 'bestseller',
      description: 'Pearl necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'n5', name: 'Pink Stone Necklace', category: 'necklaces', images: [ n5_1 ], price: 50, 
      quantityInStock: 10, status: '',
      description: 'Pink Stone necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'n6', name: 'Rain Drop Necklace', category: 'necklaces', images: [ n6_1 ], price: 30, 
      quantityInStock: 7, status: 'sale',
      description: 'Rain Drop necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }, 
   { 
      id: 'n7', name: 'Sapphire Necklace', category: 'necklaces', images: [ n7_1 ], price: 1500, 
      quantityInStock: 0, status: 'new',
      description: 'Sapphire necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
      ]
   }, 
   { 
      id: 'n8', name: 'Scorpion Necklace', category: 'necklaces', images: [ n8_1 ], price: 150, 
      quantityInStock: 1, status: 'new',
      description: 'Scorpion necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
      ]
   }, 
   { 
      id: 'n9', name: 'Turquoise Stone Necklace', category: 'necklaces', images: [ n9_1 ], price: 60, 
      quantityInStock: 13, status: 'bestseller',
      description: 'Turquoise Stone necklace - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.',
      reviews: [
         {
            date: '3/14/24',
            client: 'Sam',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '1/1/24',
            client: 'Kim',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         },
         {
            date: '12/20/23',
            client: 'Val',
            rating: 5,
            review: 'Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna etiam tempor orci. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Quis auctor elit sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.'
         }
      ]
   }
];

export default necklaces;