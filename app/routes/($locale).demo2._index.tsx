import {Link, useParams} from '@remix-run/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconFrame, IconHeart} from '~/components/Icon';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPages, setCurrentPages] = useState(1);
  const productsPages = 12;
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');

    if (prevButton && nextButton) {
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const indexOfLastProduct = currentPages * productsPages;
  const indexOfFirstProduct = indexOfLastProduct - productsPages;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  //math.ceil dùng để làm tròn trang
  //10/3=3.4 => math.ceil() =4 làm tròn thành 4 trang
  //nếu không dùng thì sẽ thành 3 trang và mất đi bớt sản phẩm
  const totalPages = Math.ceil(products.length / productsPages);
  const {locale} = useParams();
  const brands = [
    {name: 'Beayty Box', img: '/public/image/Beauty Box.webp'},
    {name: 'Dior', img: '/public/image/doir.jpg'},
    {name: 'Care', img: '/public/image/Care.jpg'},
    {name: 'BHGA', img: '/public/image/mp1.jpg'},
    {name: 'Serum', img: '/public/image/serum thao qua.webp'},
    {name: 'Orientalism', img: '/public/image/Orientalism.jpg'},
    {name: 'D&G', img: '/public/image/nước hoa D&G.jpg'},
    {name: 'Copernica', img: '/public/image/Copernica.webp'},
  ];

  const banners = [
    '../../public/image/bannerdemo.jpg',
    '../../public/image/bannerdemo3.jpg',
    '../../public/image/banner.jpg',
    '../../public/image/111.png',
  ];
  return (
    <div className="container">
      <div className="main">
        <div className="bg-gradient-to-r from-purple-100 to-blue-200 text-white text-center p-8 rounded-lg mb-6 flex flex-col md:flex-row">
          <div className="mt-[11rem]">
            <h1 className="text-5xl font-bold mr-auto">
              Giảm tới 50% cho các sản phẩm <br /> Tai nghe được chọn
            </h1>
            <button className="mt-4 px-6 py-2 text-white bg-purple-400 font-semibold rounded-3xl shadow-md hover:bg-gray-500 text-3xl">
              Mua Ngay
            </button>
          </div>

          <img
            src="../../public/image/My project 1.png"
            alt=""
            className="flex justify-end ml-auto mb-6"
          />
        </div>
        <div className="flex flex-wrap justify-between items-center mt-16 mb-12">
          <div className="flex gap-4 flex-wrap">
            <button className="mt-4 px-6 py-2 text-black bg-gray-200 rounded-2xl border border-gray-300 flex gap-3">
              Headphone type
              <IconFrame className="bg-white" />
            </button>
            <button className="mt-4 px-6 py-2 text-black bg-gray-200 rounded-2xl border border-gray-300 flex gap-3">
              Price
              <IconFrame className="bg-white" />
            </button>
            <button className="mt-4 px-6 py-2 text-black bg-gray-200 rounded-2xl border border-gray-300 flex gap-3">
              Review
              <IconFrame className="bg-white" />
            </button>
            <button className="mt-4 px-6 py-2 text-black bg-gray-200 rounded-2xl border border-gray-300 flex gap-3">
              Color
              <IconFrame className="bg-white" />
            </button>
            <button className="mt-4 px-6 py-2 text-black bg-gray-200 rounded-2xl border border-gray-300 flex gap-3">
              Material
              <IconFrame className="bg-white" />
            </button>
          </div>
          <div
            className="flex ml-auto
        "
          >
            <button className="mt-4 px-6 py-2 text-black bg-white rounded-2xl flex gap-3 border border-gray-300">
              Headphone type
              <IconFrame className="bg-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="pro grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
        {products.slice(0, 12).map((product) => (
          <li
            key={product.id}
            className="flex flex-col pt-0 pr-0 pl-0 border border-solid border-gray-300"
          >
            <Link to={`/${locale}/demo2/${product.id}`}>
              <div className="relative" style={{color: '#F7F5F7'}}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover bg-[#F7F5F7] w-full h-[244.63px] rounded-lg mt-0"
                  style={{border: '18.48px'}}
                />

                <div className="absolute top-0 mt-2 right-1 bg-white rounded-full p-2">
                  <IconHeart
                    className="two stroke-black hover:stroke-red-600 fill-none hover:fill-red-600 transition-all"
                    stroke="black"
                  />
                </div>
              </div>
            </Link>
            <div className="flex justify-center items-center text-center gap-7">
              <h2 className="line-clamp-1">{product.title}</h2>
              <p className="price">${product.price}</p>
            </div>

            <p className="max-h-[4.5rem] overflow-hidden break-words">
              {product.description}
            </p>

            <p className="rating mt-3">{product.rating}★</p>

            <div className="flex gap-2 mt-5 bottom-6 pl-[11px] pr-[11px]">
              <button className="w-full h-[36px] text-white rounded-2xl flex items-center justify-center px-2  whitespace-nowrap hover:bg-blue-800 bg-[#3A4980]">
                Thêm vào giỏ
              </button>
              <button className="w-full h-[36px] text-black rounded-2xl flex items-center justify-center px-2 whitespace-nowrap bg-[#FFFFFF] hover:bg-pink-100 border border-gray-300">
                Thêm vào danh sách
              </button>
            </div>
          </li>
        ))}
      </div>
      {/* video */}
      <div className="w-full max-w-[1100px] flex justify-center items-center mx-auto mb-10 mt-10">
        <video
          className="w-full max-w-[1000px] md:max-w-[1000px] sm:max-w-[500px] xs:max-w-[300px] h-auto"
          src="../../public/video/Video_qung_co_M_Phm_Hn.mp4"
          controls
        ></video>
      </div>
      {/* silde sản phẩm */}
      {/* <div className="">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{nextEl: '.custom-next', prevEl: '.custom-prev'}}
          autoplay={{delay: 3000, disableOnInteraction: false}}
          loop
          breakpoints={{
            320: {slidesPerView: 1},
            640: {slidesPerView: 2},
            1024: {slidesPerView: 3},
            1280: {slidesPerView: 4},
          }}
          className="my-4"
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="p-4 border border-gray-200 rounded-lg shadow-lg">
                <Link to={`/${locale}/demo2/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover w-full h-[200px] rounded-lg"
                  />
                </Link>
                <h2 className="text-center mt-2">{product.title}</h2>
                <p className="text-center text-gray-600">${product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-prev absolute left-0 z-10">
          <ChevronLeft size={24} />
        </button>
        <button className="custom-next absolute right-0 z-10">
          <ChevronRight size={24} />
        </button>
      </div> */}
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
      {/* ảnh banner to */}
      <div className="flex justify-center items-center mx-auto">
        <img src="../../public/image/111.png" alt="" />
      </div>
      {/* Phân trang */}
      <div className="flex justify-center mt-6 mb-5">
        <button
          onClick={() => setCurrentPages((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 rounded-lg mx-1 bg-white border border-gray-300"
          disabled={currentPages === 1}
        >
          Trước
        </button>

        {Array.from({length: totalPages}, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPages(index + 1)}
            className={`px-4 py-2 border rounded-lg mx-1 ${
              currentPages === index + 1 ? 'bg-purple-200' : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPages((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 border rounded-lg mx-1 bg-white border-gray-300"
          disabled={currentPages === totalPages}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default Products;
