import ProductDetails from '@/app/_components/ProductDetails';
import Reviews from '@/app/_components/Reviews';
import earringsList from '@/app/_images/earringImageList';

export default function EarringsDetailsPage({ params }) {
   var earrings = earringsList.find(earrings => earrings.id === params.id);

   return (
      <main>
         <ProductDetails product={earrings} />
         <Reviews product={earrings} />
      </main>
   );
};