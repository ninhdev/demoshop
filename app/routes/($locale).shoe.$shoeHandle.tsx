import {json, useLoaderData} from '@remix-run/react';
import {LoaderFunction, LoaderFunctionArgs} from '@remix-run/node';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {IconHeart, IconV} from '~/components/Icon';
import EmblaCarousel from '~/components/EmblaCarrousel';
import invariant from 'tiny-invariant';
import {seoPayload} from '~/lib/seo.server';

interface ShoeData {
  products: {
    nodes: {
      id: string;
      title: string;
      publishedAt: string;
      handle: string;
      vendor: string;
      variants: {
        nodes: {
          id: string;
          availableForSale: boolean;
          image?: {
            url: string;
            altText?: string;
            width: number;
            height: number;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          };
          selectedOptions: {
            name: string;
            value: string;
          }[];
          product: {
            handle: string;
            title: string;
          };
        }[];
      };
    }[];
  };
}

export async function loader({request, params, context}: LoaderFunctionArgs) {
  console.log(params);

  const {shoeHandle, locale} = params;
  console.log(shoeHandle);

  const {product} = await context.storefront.query(SHOE_QUERY, {
    variables: {
      handle: shoeHandle ?? 'default-handle',
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product) {
    throw new Response(null, {status: 404});
  }

  return json({product, locale});
}

export default function shoeDetail() {
  const {shoe} = useLoaderData<{
    shoe: ShoeData['products']['nodes'][0];
  }>();

  if (!shoe) {
    return <p>Không tìm thấy sản phẩm</p>;
  }

  const images = shoe.variants.nodes
    .map((variant) => variant.image?.url)
    .filter((url): url is string => !!url);

  const price = shoe.variants.nodes[0]?.price.amount || 'N/A';
  const currency = shoe.variants.nodes[0]?.price.currencyCode || '';

  return (
    <div className="container">
      <div className="w-full flex justify-center">
        <div className="mx-auto p-6 bg-white rounded-lg flex flex-col sm:flex-col md:flex-row gap-8 mt-10 justify-center">
          {/* Ảnh sản phẩm */}
          <div className="w-full md:w-1/2">
            <EmblaCarousel slides={images} />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-full md:w-1/2">
            <p
              className="text-[2.5rem] md:text-[35px] font-bold"
              style={{fontFamily: 'Recoleta, serif'}}
            >
              {shoe.title}
            </p>
            <p className="text-[2rem] font-semibold text-gray-500 mt-5">
              ⭐ {shoe.vendor} (288 reviews)
            </p>
            <p className="text-[2.5rem] md:text-[2.5rem] font-bold text-green-600 mt-5">
              {currency} {price}
            </p>
            <hr className="border-gray-300 my-4" />
            <p className="text-gray-700 my-4">
              {shoe.variants.nodes[0]?.product.title || 'Không có mô tả'}
            </p>
            <hr className="border-gray-300 my-4" />

            {/* Nút chọn size + số lượng */}
            <div className="flex flex-wrap md:flex-nowrap">
              <button className="md:w-[30%] sm:w-auto px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 mt-10 md:h-[30%] ml-4 w-full">
                Add to cart
              </button>
            </div>

            {/* Heart và IconV */}
            <div className="flex flex-wrap gap-7">
              <div className="mt-5 flex gap-3 w-full sm:w-auto">
                <IconHeart className="two text-white stroke-black fill-white" />
                <strong>Add to wishlist</strong>
              </div>

              <div className="mt-3 flex items-center gap-3 w-full sm:w-auto">
                <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-full mt-1">
                  <IconV className="w-6 h-6 text-red-500" />
                </div>
                <strong className="text-black mt-1 ">
                  30 days money back guarantee
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SHOE_QUERY = `#graphql
query Shoe($handle: String!, $country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
  product(handle: $handle) {  # 
    id
    title
    publishedAt
    handle
    vendor
    variants(first: 1) {
      nodes {
        id
        availableForSale
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
}
`;
