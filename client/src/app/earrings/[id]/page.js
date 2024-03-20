import ProductDetails from '@/app/_components/ProductDetails';
import earringsList from '@/app/_images/earringImageList';

export default function EarringsDetailsPage({ params }) {
   var earrings = earringsList.find(earrings => earrings.id === params.id);

   return (
      <ProductDetails product={earrings} />
   );
};