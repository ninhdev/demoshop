
import { useLoaderData } from "@remix-run/react";
import {  json, LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

const PRODUCT_QUERY = `#graphql
  query ProductQuery(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 5) {
        nodes {
          url
          altText
        }
      }
      availableForSale
      variants(first: 5) {
        nodes {
          id
          title
          price {
            amount
          }
        }
      }
    }
  }   
`;
interface Image {
  url: string;
  altText?: string;
}
interface Product {
  title: string;
  description: string;
  availableForSale: boolean;
  images: {
    nodes: Image[];
  };
}
export async function loader({ context, params, request, }: LoaderFunctionArgs) {
  const { testHandle } = params;

  if (!testHandle) {
    throw new Response("Handle not provided", { status: 404 });
  }

  const [{ product }] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: testHandle,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return{ product };
}

export function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  // console.log(product)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {product.availableForSale ? (
        <p className="text-green-600 mt-2">In stock</p>
      ) : (
        <p className="text-red-600 mt-2">Out of stock</p>
      )}
      <div className="mt-6">
        {product.images.nodes.map((image: Image) => (
          <div key={image.url}>
            <img src={image.url} alt={image.altText ?? 'Product image'} />
          </div>
        ))}
      </div>



    </div>
  );

  // return (
  // <></>
  // // <div className="">
  //   <h1 className="">{product.title}</h1>
  //   <p className="">{product.description}</p>

  //   {product.availableForSale ? (
  //     <p className="text-green-600 mt-2">In stock</p>
  //   ) : (
  //     <p className="text-red-600 mt-2">Out of stock</p>
  //   )}
  //   {/* <ProductGallery_Example product={product}/> */}
  //   {product.images.nodes.map((image, index) => (
  //     <div key={index}>
  //       <img src={product.images.nodes.url} 
  //       alt={product.images.nodes[0].altText ?? ''} />
  //     </div>
  //   ))} 
  // </div>

}