import e1 from './earrings/blue-earrings.jpg';
import e2 from './earrings/diamond-cluster-earrings.jpg';
import e3 from './earrings/diamond-earrings.jpg';
import e4 from './earrings/emerald-flower-earrings.jpg';
import e5 from './earrings/gold-earrings.jpg';
import e6 from './earrings/gold-twist-earrings.jpg';
import e7 from './earrings/pearl-circle-earrings.jpg';
import e8 from './earrings/pearl-earrings.jpg';
import e9 from './earrings/silver-blue-flower-earrings.jpg';
import e10 from './earrings/turtle-earrings.jpg';

const earrings = [
   { 
      id: 'e1', name: 'Blue Earrings', image: e1, price: 30, 
      quantityInStock: 10, status: 'sale',
      description: 'Blue earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e2', name: 'Diamond Cluster Earrings', image: e2, price: 250, 
      quantityInStock: 3, status: '',
      description: 'Diamond Cluster earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e3', name: 'Diamond Earrings', image: e3, price: 500, 
      quantityInStock: 1, status: '',
      description: 'Diamond earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e4', name: 'Emerald Flower Earrings', image: e4, price: 85, 
      quantityInStock: 2, status: 'sale',
      description: 'Emerald Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e5', name: 'Gold Earrings', image: e5, price: 50, 
      quantityInStock: 15, status: 'bestseller',
      description: 'Gold earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e6', name: 'Gold Twist Earrings', image: e6, price: 120, 
      quantityInStock: 8, status: 'new',
      description: 'Gold Twist earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e7', name: 'Pearl Circle Earrings', image: e7, price: 100, 
      quantityInStock: 14, status: '',
      description: 'Pearl Circle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e8', name: 'Pearl Earrings', image: e8, price: 50, 
      quantityInStock: 30, status: 'bestseller',
      description: 'Pearl earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e9', name: 'Silver Blue Flower Earrings', image: e9, price: 15, 
      quantityInStock: 9, status: 'bestseller',
      description: 'Silver Blue Flower earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }, 
   { 
      id: 'e10', name: 'Turtle Earrings', image: e10, price: 90, 
      quantityInStock: 6, status: 'new',
      description: 'Turtle earrings - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.'
   }
];

export default earrings;