// import {json, useLoaderData} from '@remix-run/react';
// import { LoaderFunctionArgs} from '@remix-run/node';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// interface ShoeData {
//   products: {
//     nodes: {
//       id: string;
//       title: string;
//       publishedAt: string;
//       handle: string;
//       vendor: string;
//       variants: {
//         nodes: {
//           id: string;
//           availableForSale: boolean;
//           image?: {
//             url: string;
//             altText?: string;
//             width: number;
//             height: number;
//           };
//           price: {
//             amount: string;
//             currencyCode: string;
//           };
//           compareAtPrice?: {
//             amount: string;
//             currencyCode: string;
//           };
//           selectedOptions: {
//             name: string;
//             value: string;
//           }[];
//           product: {
//             handle: string;
//             title: string;
//           };
//         }[];
//       };
//     }[];
//   };
// }
// export async function loader({ params, context}: LoaderFunctionArgs) {
//   const {productHandle} = params;
//   console.log("productHandle",productHandle);
//   const productResult = await context.storefront.query(SHOE_QUERY, {
//     variables: {
//       handle: productHandle,
//       country: context.storefront.i18n.country,
//       language: context.storefront.i18n.language,
//     },
//   });
//   const product = productResult.product
//   if (!product) {
//     throw new Response(null, {status: 404});
//   }
//   console.log("product",product);
//   return json({product});
// }
// export default function ProductDetail() {
//   const { product } = useLoaderData<typeof loader>();
//   const { id, title, publishedAt, handle: productHandle, vendor, variants } = product;
//   return (
//     <div>
//     <h1>{title}</h1>
//     <p><strong>publishedAt:</strong> {new Date(publishedAt).toLocaleDateString()}</p>
//     <p><strong>Handle:</strong> {productHandle}</p>
//     <p><strong>Vendor:</strong> {vendor}</p>
//     {variants.nodes.map((variant) => (
//       <div key={variant.id} >
//         <p><strong>Status:</strong> {variant.availableForSale ? 'Instock' : 'Out of stock'}</p>
//         {variant.image && (
//           <img
//             src={variant.image.url}
//             alt={variant.image.altText || 'Product image'}
//             width={variant.image.width || 300}
//             height={variant.image.height || 300}
//             loading="lazy"
//           />
//         )}
//         <p><strong>Price:</strong> {variant.price.amount} {variant.price.currencyCode}</p>
//         {variant.compareAtPrice && (
//           <p><strong>Price:</strong> {variant.compareAtPrice.amount} {variant.compareAtPrice.currencyCode}</p>
//         )}
//       </div>
//     ))}
//   </div>
// );
// };
// const SHOE_QUERY = `#graphql
// query Shoe($handle: String!, $country: CountryCode, $language: LanguageCode)
//   @inContext(country: $country, language: $language) {
//   product(handle: $handle) {  #
//     id
//     title
//     publishedAt
//     handle
//     vendor
//     variants(first: 1) {
//       nodes {
{
  /* <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={10}
            modules={[FreeMode, Navigation, Thumbs,  ]}
            onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
            thumbs={{swiper: thumbsSwiper}}
            className="mySwiper2"
          >
            {imageNodes.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url ?? '/placeholder.jpg'}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[610px] object-cover rounded-lg bg-[#F2F2F2]"
                />
              </SwiperSlide>
            ))}
          </Swiper> */
}
