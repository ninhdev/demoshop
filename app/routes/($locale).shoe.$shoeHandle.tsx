import {json, useLoaderData} from '@remix-run/react';
import {LoaderFunctionArgs} from '@remix-run/node';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/pagination';

import {IconFrame1, IconHeart, IconV} from '~/components/Icon';
import {ChevronLeft, ChevronRight, CircleCheckBig} from 'lucide-react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import EmblaCarousel from '~/components/EmblaCarrousel';

export const swiperOptions = {
  spaceBetween: 20,
  slidesPerView: 4,
  navigation: {nextEl: '.custom-next', prevEl: '.custom-prev'},
  autoplay: {delay: 3000, disableOnInteraction: false},
  loop: true,
  breakpoints: {
    320: {slidesPerView: 1},
    640: {slidesPerView: 2},
    1024: {slidesPerView: 3},
    1280: {slidesPerView: 4},
  },
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {shoeHandle} = params;
  const productResult = await context.storefront.query(SHOE_QUERY, {
    variables: {
      handle: shoeHandle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  const product = productResult.product;
  if (!product) {
    throw new Response(null, {status: 404});
  }

  const {products} = await context.storefront.query(SHOES_QUERY_LIST);
  return json({product, products});
}

export default function ProductDetail() {
  const {product, products} = useLoaderData<typeof loader>();

  const {nodes} = products;
  const listImages = product.images.nodes;
  console.log({listImages});
  console.log({nodes});
  console.log(products);

  const {
    id,
    title,
    publishedAt,
    handle: productHandle,
    vendor,

    variants,
  } = product;
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  console.log(product.variants.nodes[0].price.amount);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const news = [
    {name: 'nike2', image: '/public/image/nike2.webp'},
    {name: 'vot', image: '/public/image/vot.webp'},
    {name: 'New Balance', image: '/public/image/aoden.webp'},
    {name: 'New Balance', image: '/public/image/chaybo.webp'},
  ];
  const banners = [
    '/image/banner1.webp',
    '/image/banner2.webp',
    '/image/banner3.webp',
    '/image/banner giay.webp',
    '/image/image.webp',
  ];
  useEffect(() => {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    if (prevButton && nextButton) {
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
    }
  }, []);

  return (
    <div className="container">
      <div className="w-full flex justify-center">
        <div className="mx-auto md:p-6 max-w-[1208px] bg-white rounded-lg flex flex-col md:flex-row gap-8 mt-10 w-full">
          <div className="gallery w-full lg:w-1/2 mx-auto relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation={{
                prevEl: '.prevSlide',
                nextEl: '.nextSlide',
              }}
              pagination={{clickable: true, el: '.swiper-pagination'}}
              className="relative"
            >
              {listImages.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={item.url}
                    alt={`Slide ${index}`}
                    className="w-full object-contain max-h-[400px] rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="info lg:w-1/2 w-full">
            <p
              className="text-[2.5rem] md:text-[35px] font-bold"
              style={{fontFamily: 'Recoleta, serif'}}
            >
              {product.title}
            </p>
            <p className="text-[2rem] font-semibold text-gray-500 mt-5">
              ⭐ {product.vendor} (288 reviews)
            </p>
            <hr className="border-gray-300 my-4" />
            <p className=" md:text-[2.5rem] font-bold text-green-600 mt-5">
              ${product.variants.nodes[0].price.amount}
            </p>
            <p className="mt-5">
              {product.availableForSale ? 'Instock' : 'Out of stock'}
            </p>
            <hr className="border-gray-300 my-4" />

            <p className="text-gray-700 my-4">
              Skateboarding is an exciting and dynamic sport that involves
              riding and performing tricks on a skateboard. It originated in the
              1950s in California, where surfers wanted to recreate the feeling
              of riding waves on land. Over the years, skateboarding has evolved
              into a global phenomenon with various styles, including street
              skating, vert skating, and freestyle.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border-t pt-4">
              <div className="flex items-center gap-4 ">
                {/* Nút tăng giảm số lượng */}
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Nút chọn size + số lượng */}
            <div className="flex flex-wrap md:flex-nowrap gap-5">
              <button className="md:w-[30%] sm:w-auto px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 mt-10 md:h-[30%] ml-4 w-full">
                Add to cart
              </button>
              <button className="md:w-[30%] sm:w-auto px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 mt-10 md:h-[30%] ml-4 w-full">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* sản phẩm tương tự */}
      <strong className="text-[30px] font-bold relative after:block after:h-[3px] after:bg-gray-500 after:mt-2 after:content-[''] after:w-full text-center mt-[40px] mb-[20px] inline-block w-fit">
        Sản phẩm tương tự
      </strong>
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          className="relative my-4"
          {...swiperOptions}
        >
          {nodes.map((shoe) => {
            const firstVariant = shoe.variants?.nodes?.[0];
            return (
              <SwiperSlide key={shoe.id}>
                <div className="flex flex-col bg-white rounded-lg p-2 border border-solid border-gray-300">
                  <div className="relative " style={{color: '#F7F5F7'}}>
                    <img
                      src={firstVariant?.image?.url ?? '/placeholder.jpg'}
                      alt={product.title}
                      className="object-cover w-full h-[244px] rounded-lg bg-[#F7F5F7] "
                    />
                  </div>

                  <div className="p-2 ">
                    <div className="flex justify-between">
                      {' '}
                      <h2 className="text-[15px]">{vendor}</h2>
                      <div className="flex gap-4">
                        <IconHeart
                          className="two stroke-gray hover:stroke-red-600 fill-none hover:fill-red-600 transition-all"
                          stroke="gray"
                        />
                        <CircleCheckBig className=" text-gray-400 " />
                      </div>
                    </div>

                    <div className="flex ">
                      {' '}
                      <p className="rating text-[18px]">★★★★★</p>
                      <p className="text-[18px]">(3)</p>
                    </div>
                    <h2 className="text-[20px] font-bold">{shoe.title}</h2>
                    <div className="flex gap-5">
                      <span className="text-gray-500 line-through text-[18px]">
                        $130.00
                      </span>
                      <p className="text-red-600 text-[18px]">
                        ${firstVariant?.price?.amount ?? 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Nút điều hướng tùy chỉnh */}
        <button className="custom-prev absolute left-5 top-1/2 -translate-y-1/2 p-3 text-black z-10">
          <ChevronLeft size={30} />
        </button>
        <button className="custom-next absolute right-5 top-1/2 -translate-y-1/2 p-3 text-black z-10">
          <ChevronRight size={30} />
        </button>
      </div>
      {/* banner */}
      <div className="relative w-full max-w-[1280px] mx-auto mb-10 mt-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{delay: 3000}}
          loop
          className="rounded-lg"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full max-h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* bài viết */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-[381px] h-[218px] object-cover rounded-lg shadow-md"
            />
            <span className="block mt-4 text-[10px] font-normal opacity-70 text-left">
              Demo Owen v1 Admin
              <span className="px-2">|</span>
              Tue Nov 08 2022
            </span>
            <p className="mt-2 flex-1 md:text-lg uppercase leading-none text-left font-bold text-black">
              The Best Nike Black Friday Deals of 2023
            </p>
            <div className="mt-2 opacity-70 text-left mb-10">
              <span>
                Black Friday 2023 is coming, and that only means one thing —
                it’s time to fill your ...
              </span>
            </div>
          </div>
        ))}
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
    images(first: 10) {
      nodes {
        url
      }
    }
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

const SHOES_QUERY_LIST = `#graphql
query Shoe {
  products(first: 50) {
  nodes {
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
}
`;
