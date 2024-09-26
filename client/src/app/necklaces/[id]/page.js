import ProductDetails from '@/app/_components/ProductDetails';
import Reviews from '@/app/_components/Reviews';

export default function NecklaceDetailsPage({ params }) {
   return (
      <main>
         <ProductDetails productId={params.id} />
         {/* <Reviews productId={params.id} /> */}
      </main>
   );
};