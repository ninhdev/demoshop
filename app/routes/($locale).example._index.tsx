import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { Productcard_example } from '~/components/Productcard_example';


const PRODUCT_LIST = `#graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        description
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
              }
            }
          }
        }
      }
    }
  }
}
`;

export async function loader({ context, request }: LoaderFunctionArgs) {
  const { products } = await context.storefront.query(PRODUCT_LIST, {
    variables: {
      first: 100,
    },
  });

  return products?.edges.map((edge: any) => edge.node) || [];
}

export default function ExampleTest() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="px-24">
      {/* Banner Section */}
      <div className="relative pt-[40px]">
        <img
          className="w-full h-[287px] object-cover rounded-[18px]"
          src="/images/brand-banner.png"
          alt="banner"
        />
        <img
          className="absolute right-4 top-1/2 -translate-y-1/2 -translate-x-3/4"
          src="/images/avatar-banner.png"
          alt="avatar-banner"
        />
        <p className="font-black absolute top-12 left-8 text-[#3A4980] text-3xl translate-y-3/4">
          Grab Upto 50% Off On <br /> Selected Headphones
        </p>
        <button className="absolute py-[15px] px-[34px] bg-[#3A4980] rounded-[30px] text-white left-8 top-1/2 translate-y-1/2 hover:bg-[#ffffff] hover:text-[#3A4980]">
          Buy Now
        </button>
      </div>

      {/* Filter Section */}
      <div className="pt-[30px] flex justify-between">
        <div className="flex items-center gap-4">
          {['Headphone Type', 'Price', 'Review', 'Color', 'Material'].map(
            (filter) => (
              <button
              
                key={filter}
                className="py-[10px] px-[14px] bg-[#EBEDEC] rounded-[28px] cursor-pointer">
                {filter}
              </button>
            )
          )}
        </div>

        <button className="py-[10px] px-[14px] bg-[#FFFFFF] rounded-[28px] cursor-pointer border-[1px] border-[#E0E0E0]">
          Headphone Type
        </button>
      </div>

      {/* Product List */}
      <div className="pt-[30px] grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            to={`/example/${product.handle}`}
            key={product.handle}
            className="w-full h-full flex justify-between items-center"
          >
            <Productcard_example
              id={product.id}
              title={product.title}
              image={product.images.edges[0]?.node.url || 'Not Found'}
              priceV2={product.variants.edges[0]?.node.priceV2.amount}
              description={product.description}
              handle={product.handle}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
