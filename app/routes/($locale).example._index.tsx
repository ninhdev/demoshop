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

    const data: { products: Product[] } = await response.json() as {products: Product[]};

    return json({ products: data.products || [] });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function Example() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center p-3">Product List</h2>
      <div>
        <ul className="grid grid-cols-4 gap-3 ">
          {products.length === 0 ? (
            <p className="text-center col-span-full">No products</p>
          ) : (
            products.map((product) => {
              const discount = Math.floor(product.discountPercentage);
              return (
                <li
                  key={product.id}
                  className="w-full h-auto box-border bg-gray-50 rounded-xl leading-6 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div>
                    <Link to={`/example/${product.id}`}>
                      <img
                        className="w-full object-cover rounded-t-xl"
                        src={product.thumbnail ?? '/placeholder.jpg'}
                        alt={product.title}
                      />
                      <p className="p-2 text-lg font-semibold truncate">
                        {product.title}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 mt-2 p-2 relative">
                      <span className="text-red-500 font-semibold">${product.price}</span>
                      <span className="font-bold text-red-500 bg-neutral-50">-{discount}%</span>
                      <span className="text-sm text-gray-700 capitalize absolute right-2">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <Link className="flex items-center justify-center hover:underline p-5" to="/">
        Return to home page
      </Link>
    </div>
  );
}
