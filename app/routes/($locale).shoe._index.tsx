'use client';

import {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import {ChevronLeft, ChevronRight, CircleCheckBig} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {IconHeart} from '~/components/Icon';
import {Link} from '~/components/Link';
import {json, LoaderFunctionArgs} from '@remix-run/server-runtime';
import {useLoaderData, useParams} from '@remix-run/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {getSeoMeta} from '@shopify/hydrogen';
import {MetaArgs} from '@shopify/remix-oxygen';

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const data = await storefront.query(SHOE_QUERY);

  return json({data});
};
export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

const BannerSlider = () => {
  const [activeTab, setActiveTab] = useState('Men');
  useEffect(() => {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    if (prevButton && nextButton) {
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
    }
  }, []);

  const banners = [
    '/image/banner1.webp',
    '/image/banner2.webp',
    '/image/banner3.webp',
  ];
  const collections = [
    {title: 'FOR WOMEN', image: '/image/a1.webp'},
    {title: 'FOR MEN', image: '/image/a2.webp'},
    {title: 'FOR KID', image: '/image/a3.webp'},
    {title: 'SPORTWARE', image: '/image/a4.webp'},
  ];
  const brands = [
    {name: 'Adidas', img: '/public/image/adidas.webp'},
    {name: 'Puma', img: '/public/image/puman.webp'},
    {name: 'Nike', img: '/public/image/nike.webp'},
    {name: 'New Balance', img: '/public/image/NB.webp'},
    {name: 'Reebok', img: '/public/image/reehok.webp'},
    {name: 'Converse', img: '/public/image/convers.webp'},
    {name: 'Asics', img: '/public/image/ascis.webp'},
    {name: 'Vans', img: '/public/image/vans.webp'},
  ];
  const news = [
    {name: 'nike2', image: '/public/image/nike2.webp'},
    {name: 'vot', image: '/public/image/vot.webp'},
    {name: 'New Balance', image: '/public/image/aoden.webp'},
    {name: 'New Balance', image: '/public/image/chaybo.webp'},
  ];
  const {data} = useLoaderData<typeof loader>();
  console.log(data);
  const {locale} = useParams();
  console.log('Locale:', locale);

  return (
    <div className="container">
      <div className="relative w-full max-w-[1280px] mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          pagination={{clickable: true}}
          autoplay={{delay: 3000}}
          loop
          className="rounded-lg "
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

        {/* mũi tên */}
        <button className="custom-prev hidden absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white z-10">
          <ChevronLeft size={30} className="sm:size-50 -translate-y-1/2" />
        </button>
        <button className="custom-next hidden absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full text-white z-10">
          <ChevronRight size={30} className="sm:size-50 -translate-y-1/2" />
        </button>
      </div>
      <div className="flex items-center justify-between pt-[40px] pb-[20px]">
        <h3 className="whitespace-pre-wrap text-xl md:text-2xl font-bold text-heading3">
          TOP COLLECTIONS
        </h3>
        <a className="underline" data-discover="true" href="/collections">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem] mt-10 mb-10 max-w-[1280px] mx-auto p-0">
        {collections.map((item, index) => (
          <div
            key={index}
            className="relative mx-auto w-full max-w-[300px] h-[200px] sm:h-[400px] "
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg mt-0"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white ">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* NEW ARRIVALS */}
      <div className="text-center pt-[40px] pb-[20px]">
        <h2 className="text-[25px] mt-10 block">NEW ARRIVALS</h2>

        <div className="flex justify-center gap-10 mb-10">
          {['Men', 'Women', 'Accessories'].map((tab) => (
            <p
              key={tab}
              className={`cursor-pointer ${
                activeTab === tab
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>
      </div>

      {/* listpro */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          autoplay={{delay: 3000, disableOnInteraction: false}}
          loop
          breakpoints={{
            320: {slidesPerView: 1},
            640: {slidesPerView: 2},
            1024: {slidesPerView: 3},
            1280: {slidesPerView: 4},
          }}
          className="relative my-4"
        >
          {data?.products?.nodes.map((product) => {
            const firstVariant = product.variants?.nodes?.[0];
            return (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col bg-white rounded-lg p-2 border border-solid border-gray-300">
                  <Link to={`/shoe/${product.handle}`} prefetch="none">
                    <div className="relative " style={{color: '#F7F5F7'}}>
                      <img
                        src={firstVariant?.image?.url ?? '/placeholder.jpg'}
                        alt={product.title}
                        className="object-cover w-full h-[244px] rounded-lg bg-[#F7F5F7] "
                      />
                    </div>
                  </Link>

                  <div className="p-2 ">
                    <div className="flex justify-between">
                      {' '}
                      <h2 className="text-[15px]">{product.vendor}</h2>
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
                    <h2 className="text-[20px] font-bold">{product.title}</h2>
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
      {/* nut button */}

      <div className="flex justify-center mb-[10rem]">
        <button className="border border-black bg-white text-black py-3 px-6 rounded-full text-[20px] font-medium hover:bg-black hover:text-white transition-all">
          View more
        </button>
      </div>
      {/* image */}
      <div className="mb-10">
        <img src="../../public/image/image.webp" alt="" />
      </div>
      {/* FEATURED BRANDS */}
      <div className="flex items-center justify-between pt-[40px] pb-[20px]">
        <h2 className="whitespace-pre-wrap text-xl md:text-2xl font-bold uppercase text-heading3">
          FEATURED BRANDS
        </h2>
        <a className="underline" data-discover="true" href="/pages/brands">
          View All Brand
        </a>
      </div>
      {/* brands */}
      <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-4 md:gap-6 items-center p-0">
        {brands.map((brand, index) => (
          <div key={index} className="text-center">
            <img
              src={brand.img}
              alt={brand.name}
              className="w-[381px] h-[218px] object-cover rounded-lg shadow-md"
            />
            <p className="mt-2 text-[20px]">{brand.name}</p>
          </div>
        ))}
      </div>
      {/* LATEST NEWS */}

      <div className="flex items-center justify-between pt-[40px] pb-[20px]">
        <h2 className="whitespace-pre-wrap text-xl md:text-2xl font-bold uppercase text-heading3">
          LATEST NEWS
        </h2>
        <a className="underline" data-discover="true" href="/journal">
          View All
        </a>
      </div>
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
      <div className="w-full max-w-[1100px] flex justify-center items-center mx-auto mb-10 mt-10">
        <video
          className="w-full max-w-[1000px] md:max-w-[1000px] sm:max-w-[500px] xs:max-w-[300px] h-auto"
          src="../../public/video/Sn_phm_hc_vin_lp_quay_Quay_gii_thiu_Giy.mp4"
          controls
        ></video>
      </div>
    </div>
  );
};

export default BannerSlider;

const SHOE_QUERY = `#graphql
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
