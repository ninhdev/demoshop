import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunction} from '@remix-run/server-runtime';
import ProductItem from '~/components/ProductItem';
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
}

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Response('fail to fetch product', {status: response.status});
  }
  const data = await response.json();
  return json({products: data.products});
};

export default function Products() {
  const {products} = useLoaderData<{products: Product[]}>();

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
