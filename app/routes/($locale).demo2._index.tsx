import {Link, useParams} from '@remix-run/react';
import React, {useEffect, useState} from 'react';
import {IconFrame, IconHeart} from '~/components/Icon';
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
  return (
    <div className="container">
      <div className="main">
        <div className="bg-gradient-to-r from-purple-100 to-blue-200 text-white text-center p-8 rounded-lg mb-6 flex flex-col md:flex-row">
          <div className="mt-20">
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

      <div className="pro grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col pt-0 pr-0 pl-0">
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
              <p className="price text-xl">${product.price}</p>
            </div>

            <p className="line-clamp-1">{product.description}</p>

            <p className="rating text-xl mt-3" style={{marginLeft: '-87px'}}>
              {product.rating}★
            </p>

            <div className="flex gap-2 mt-5 bottom-6 pl-[11px] pr-[11px]">
              <button className="w-full h-[36px] text-white rounded-2xl flex items-center justify-center px-2 text-sm whitespace-nowrap hover:bg-blue-800 bg-[#3A4980]">
                Thêm vào giỏ
              </button>
              <button className="w-full h-[36px] text-black rounded-2xl flex items-center justify-center px-2 text-sm whitespace-nowrap bg-[#FFFFFF] hover:bg-pink-100 border border-gray-300">
                Thêm vào danh sách
              </button>
            </div>
          </li>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 mb-5">
        <button
          onClick={() => setCurrentPages((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 border rounded-lg mx-1 bg-white border border-gray-300"
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
