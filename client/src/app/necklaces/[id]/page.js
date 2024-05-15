import ProductDetails from '@/app/_components/ProductDetails';
import Reviews from '@/app/_components/Reviews';
import necklaceList from '@/app/_images/necklaceImageList';

export default function NecklaceDetailsPage({ params }) {
   var necklace = necklaceList.find(necklace => necklace.id === params.id);

   return (
      <main>
         <ProductDetails product={necklace} />
         <Reviews product={necklace} />
      </main>
   );
};