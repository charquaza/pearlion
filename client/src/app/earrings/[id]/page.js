import ProductDetails from '@/app/_components/ProductDetails';
import Reviews from '@/app/_components/Reviews';

export default function EarringsDetailsPage({ params }) {
   return (
      <main>
         <ProductDetails productId={params.id} />
         {/* <Reviews productId={params.id} /> */}
      </main>
   );
};