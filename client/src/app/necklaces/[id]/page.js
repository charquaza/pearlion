import ProductDetails from '@/app/_components/ProductDetails';
import necklaceList from '@/app/_images/necklaceImageList';

export default function NecklaceDetailsPage({ params }) {
   var necklace = necklaceList.find(necklace => necklace.id === params.id);

   return (
      <ProductDetails product={necklace} />
   );
};