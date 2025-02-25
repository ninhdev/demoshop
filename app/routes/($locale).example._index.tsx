import {
  json,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Link } from '~/components/Link';
import type { Product } from '~/data/types';
import { routeHeaders } from '~/data/cache';
export const headers = routeHeaders;

export const loader = async ({
  request,
  context: { storefront },
}: LoaderFunctionArgs) => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20");
    if (!response.ok) {
      throw new Response("Failed to fetch data", { status: 500 });
    }

    const data: { products: Product[] } = await response.json();
    const headers = {
      'Content-Security-Policy': "img-src * data: blob:;",
    };

    return json({ products: data.products || [] }, { headers });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function Example() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div className="w-7xl">
      <h2 className="text-2xl font-bold text-center p-3">Product List</h2>
      <div>
        <ul className="grid 2xl:grid-cols-4 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {products.length === 0 ? (
            <p className="text-center col-span-full">Không có sản phẩm nào.</p>
          ) : (
            products.map((product) => (
              <li
                key={product.id}
                className="w-full h-auto box-border bg-gray-50 rounded-xl leading-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <img
                    className="w-full object-cover rounded-t-xl"
                    src={product.thumbnail ?? '/placeholder.jpg'}
                    alt={product.title}
                  />
                  
                  
                  <p className="p-2 text-lg font-semibold truncate">
                    <Link to={`/example/${product.id}`}>{product.title}</Link>
                  </p>
                  <div className="flex items-center gap-2 mt-2 p-2 relative">
                    <span className="line-through text-gray-500">${product.price}</span>
                    <span className="font-bold text-red-500">${product.discountPercentage}</span>

                    <span className="text-sm text-gray-700 capitalize absolute right-2">
                      {product.category}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <Link className="flex items-center justify-center hover:underline p-5" to="/">
        Return to home page
      </Link>
    </div>
    
  );
}
