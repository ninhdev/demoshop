import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { Productcard_example } from "~/components/Productcard_example";
import { useState } from 'react';
const PRODUCT_LIST = `#graphql
  query GetProducts($first: Int!) {
    products(first: $first ) {
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
          variants(first: 1) {
            edges {
              node {
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


interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    description?: string;
    images: {
      edges: { node: { url: string; altText?: string } }[];
    };
    variants: {
      edges: { node: { id: string; title: string; priceV2: { amount: string } } }[];
    };
  };
}
export async function loader({ context, request }: LoaderFunctionArgs) {
  const { products } = await context.storefront.query(PRODUCT_LIST, {
    variables: { first: 20 },
  });

  return products?.edges.map((edge: any) => edge.node) || [];
}

export default function ExampleTest() {
  const products = useLoaderData<typeof loader>();

  const buttons = ['Headphone Type', 'Price', 'Review', 'Color', 'Material'];
  
  const [showmore, setShowmore] = useState(false);

  const categories = [
    { name: 'Kid' },
    { name: 'Man' },
    { name: 'Woman' },
    { name: 'Casual' },
    { name: 'Sport' },
    { name: 'Rainbow' },
    { name: 'Rainbow' },
    { name: 'Rainbow' },
  ];

  const brands = [
    { name: 'Adidas' },
    { name: 'Nick' },
    { name: 'Jacek & Co' },
    { name: 'My Shooed' },
    { name: 'Florida Fox' },
  ];
  const ratings = [
    { label: ' 4.5 & up' },
    { label: '4.0 & up' },
    { label: '3.5 & up' },
    { label: ' 3.0 & up' },
  ]
 
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <div className="relative pt-[40px]">
        {/* Banner*/}
        <div className="w-full relative overflow-hidden rounded-[18px] flex items-center justify-between">
          <img
            className="w-full h-auto"
            src="/images/brand-banner.png"
            alt="banner"
          />
          
          <img
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-28 sm:w-40 md:w-52 lg:w-64 xl:w-80 h-auto"
            src="/images/avatar-banner.png"
            alt="avatar-banner"
          />
        </div>

        
        <div className="absolute top-6 sm:top-12 left-4 sm:left-8">
          <p className="font-black text-[#3A4980] text-lg sm:text-sm md:text-base p-2">
            Grab Upto 50% Off On <br/> Selected Headphones
          </p>

          <button className="mt-4 py-2 px-4 sm:py-3 sm:px-6 bg-[#3A4980] rounded-[30px] text-white hover:bg-white hover:text-[#3A4980] transition-all">
            Buy Now
          </button>
        </div>
      </div>


      {/* Filter Section */}
      <div className="pt-[30px] flex flex-col md:flex-row justify-between gap-4">
        {/* Button Filter */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {buttons.map((button) => (
            <button
              key={button}
              className="py-[10px] px-[14px] bg-[#EBEDEC] rounded-[28px] cursor-pointer hover:bg-[#d9d9d9] whitespace-nowrap">
              {button}
            </button>
          ))}
        </div>
        <button className="py-[10px] px-[14px] bg-white rounded-[28px] cursor-pointer border border-[#E0E0E0]">
          Headphone Type
        </button>
      </div>

      {/* Product List & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 ">
        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1 w-full h-screen border border-gray-300 p-4 rounded-lg">
          {/* Category */}
          <div className="border-b border-gray-300 p-4">
            <h4 className="text-[#140342] text-xl font-semibold mb-4">Category</h4>
            {categories.map((category,item) => (
              <label key={item} className="block mb-2">
                <input type="checkbox" className="mr-2" />
                {category.name}
              </label>
            ))}
            {categories.length > 5 && !showmore && (
               <button onClick={() => setShowmore(!showmore)}>
                  {showmore ? 'Show Less' : 'Show More'}
               </button>
            )}
          </div>

          {/* Ratings */}
          <div className="pt-3 border-b">
            <h4 className="text-[#140342] text-xl font-semibold">Ratings</h4>
            {ratings.map((rating) => (
              <label key={rating.label} className="block mb-2">
                <input type="radio" name="rating" className="mr-2" />
                {rating.label}
              </label>
            ))}
            
          </div>

          {/* Brand */}
          <div className="pt-3 border-b">
            <h4 className="text-[#140342] text-xl font-semibold">Brand</h4>
            {brands.map((brand) => (
              <label key={brand.name} className="block mb-2">
                <input type="checkbox" className="mr-2 rounded-none" />
                {brand.name}
              </label>
            ))}
            <button className="text-blue-500 underline">Show more</button>
          </div>

          {/* Price */}
          <div className="pt-3 border-b">
            <h4 className="text-[#140342] text-xl font-semibold">Price</h4>
            <input
              type="range"
              min="0"
              max="200"
              defaultValue="200"
              className="w-full"
            />
            <div className="flex items-center gap-4">
              <span className="border rounded-xl pr-14 pl-1 py-1">5</span>
              <span className="border rounded-xl px-7 py-1">$200</span>
            </div>
          </div>

          {/* Size */}
          <div className="pt-3">
            <h4 className="text-[#140342] text-xl font-semibold">Size</h4>
            <input
              type="range"
              min="5"
              max="10"
              defaultValue="10"
              className="w-full"
            />
            <div className="flex items-center gap-4">
              <span className="border rounded-xl pr-14 pl-1 py-1">5</span>
              <span className="border rounded-xl pr-14 pl-1 py-1">10</span>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Productcard_example
              key={product.id}
              id={product.id}
              title={product.title}
              images={product.images}
              variants={product.variants}
              description={product.description}
              handle={product.handle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}