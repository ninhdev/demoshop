// import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
// import { useLoaderData } from '@remix-run/react';
// import { Link } from '@remix-run/react';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const PRODUCT_LIST = `#graphql
//   query ProductListByHandle($handle: String!) {
//     productByHandle(handle: $handle) {
//       id
//       title
//       description
//       handle
//       priceRange {
//         minVariantPrice {
//           amount
//         }
//       }
//       images(first: 20) {
//         nodes {
//           url
//           altText
//         }
//       }
//     }
//   }
// `;

// export async function loader({ context }: LoaderFunctionArgs) {
//   const handle = "the-hosted-snowboard"; 
//   const { productByHandle } = await context.storefront.query(PRODUCT_LIST, {
//     variables: { handle },
//   });

//   console.log(productByHandle);

//   return productByHandle ? [productByHandle] : [];
// }

// export default function ExampleTest() {
//   const products = useLoaderData<typeof loader>();

//   return (
//     <div>
//       <div className="px-24">
//         {/* Banner Section */}
//         <div className="relative pt-[40px]">
//           <img
//             className="w-full h-[287px] object-cover rounded-[18px]"
//             src="/images/brand-banner.png"
//             alt="banner"
//           />
//           <img
//             className="absolute right-4 top-1/2 -translate-y-1/2 -translate-x-3/4"
//             src="/images/avatar-banner.png"
//             alt="avatar-banner"
//           />

//           <p className="font-black absolute top-12 left-8 text-[#3A4980] text-3xl translate-y-3/4">
//             Grab Upto 50% Off On <br /> Selected Headphones
//           </p>
//           <button className="absolute py-[15px] px-[34px] bg-[#3A4980] rounded-[30px] text-white left-8 top-1/2 translate-y-1/2 hover:bg-[#ffffff] hover:text-[#3A4980]">
//             Buy Now
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="pt-[30px] flex justify-between">
//           <div className="flex items-center gap-4">
//             {["Headphone type", "Price", "Review", "Color", "Material", "Offer"].map(
//               (label) => (
//                 <button
//                   key={label}
//                   className="py-[10px] px-[14px] bg-[#EBEDEC] rounded-[28px] cursor-pointer"
//                 >
                  
//                 </button>
//               )
//             )}
//           </div>

//           <div>
//             <button className="py-[10px] px-[14px] bg-[#FFFFFF] rounded-[28px] cursor-pointer border-[1px] border-[#E0E0E0]">
//               Headphone Type 
//             </button>
//           </div>
//         </div>

//         {/* Product List */}
//         <h1>Product List</h1>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <Link to={`/example/${product.handle}`}>{product.title}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
