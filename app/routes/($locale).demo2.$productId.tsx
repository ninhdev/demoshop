import {json, useLoaderData} from '@remix-run/react';
import {LoaderFunction} from '@remix-run/node';
import {useRef, useState} from 'react';
import {
  IconFrame1,
  IconHeart,
  IconIn,
  IconLeft,
  IconOn,
  IconRight,
  IconV,
} from '~/components/Icon';

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

export const loader: LoaderFunction = async ({params}) => {
  const response = await fetch(
    `https://dummyjson.com/products/${params.productId}`,
  );

  if (!response.ok) {
    throw new Response('Product not found', {status: 404});
  }

  const product = (await response.json()) as Product;
  return json(product);
};

export default function ProductDetail() {
  const product = useLoaderData<Product>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedFlavor, setSelectedFlavor] = useState('Orange');
  const selectRef = useRef(null);
  const [selectedSize, setSelectedSize] = useState('100ml');
  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const flavours = [
    {name: 'Orange', img: '../../public/image/image 42.png'},
    {name: 'Blueberry', img: '../../public/image/image 44.png'},
    {name: 'Lime', img: '../../public/image/image 45.png'},
  ];
  //mũi tên trái phải ảnh
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = product.images;

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      setSelectedImage(images[newIndex]);
      return newIndex;
    });
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      setSelectedImage(images[newIndex]);
      return newIndex;
    });
  };
  //
  const [activeTab, setActiveTab] = useState('Details');
  const tabs = ['Details', 'Packaging', 'Shipping details'];
  return (
    <div className="container">
      <div className="w-full flex justify-center">
        <div className="mx-auto p-6 bg-white rounded-lg flex flex-col sm:flex-col md:flex-row gap-8 mt-10 justify-center">
          {/* ảnh sản phẩm */}
          <div className="w-full md:w-1/2">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full md:w-[500px] h-[440px] object-cover rounded-lg"
            />
            <div className="flex gap-2 justify-center">
              <button onClick={handlePrev}>
                <IconLeft className="w-6 h-6 text-gray-500" />
              </button>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  className={`rounded-lg cursor-pointer border w-[80px] md:w-[120px] h-[80px] md:h-[100px] mt-5 gap-7 ${
                    selectedImage === img ? 'border-green-500' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
              <button onClick={handleNext}>
                <IconRight className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
          {/* ảnh, giá */}
          <div className="w-full md:w-1/2">
            <p
              className="text-2xl md:text-3xl font-bold"
              style={{fontFamily: 'Recoleta, serif'}}
            >
              {product.title}
            </p>
            <p className="text-md md:text-lg font-semibold text-gray-500 mt-5">
              ⭐ {product.rating} (288 reviews)
            </p>
            <p className="text-xl md:text-2xl font-bold text-green-600 mt-5">
              ${product.price}
            </p>
            <hr className="border-gray-300 my-4" />
            <p className="text-gray-700 my-4">{product.description}</p>
            <hr className="border-gray-300 my-4" />

            {/* Chọn flavour */}
            <div className="mt-4">
              <span className="font-semibold text-lg">Flavour</span>
              <p className="text-gray-500">{selectedFlavor}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {flavours.map((flavor) => (
                  <div
                    key={flavor.name}
                    className={`w-14 h-14 md:w-16 md:h-16 p-1 border rounded-lg flex items-center justify-center cursor-pointer transition ${
                      selectedFlavor === flavor.name
                        ? 'border-green-600 shadow-md'
                        : 'border-transparent bg-gray-100'
                    }`}
                    onClick={() => setSelectedFlavor(flavor.name)}
                  >
                    <img
                      src={flavor.img}
                      alt={flavor.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-300 my-4" />

            {/* Nút chọn size + số lượng */}
            <div className=" flex flex-wrap md:flex-nowrap">
              <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border-t pt-4">
                <div className="flex items-center gap-4 ">
                  {/* Dropdown chọn dung tích */}
                  <div className="relative flex px-4 py-2 bg-gray-100 rounded-lg">
                    <select
                      ref={selectRef}
                      className="bg-gray-100 appearance-none outline-none cursor-pointer pr-6 border-none w-full"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="100ml">100ml</option>
                      <option value="200ml">200ml</option>
                      <option value="500ml">500ml</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <IconFrame1 className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>

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

              {/* Nút Add to cart */}
              <button className="md:w-[30%] sm:w-auto px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 mt-10 md:h-[30%] ml-4 w-full">
                Add to cart
              </button>
            </div>
            {/* heart and iconV */}
            <div className="flex flex-wrap gap-7">
              <div className="mt-5 flex gap-3 w-full sm:w-auto">
                <IconHeart className="two text-white stroke-black fill-white" />
                <strong className="text-sm">Add to wishlist</strong>
              </div>

              <div className="mt-1 flex items-center gap-3 w-full sm:w-auto">
                <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full">
                  <IconV className="w-4 h-4 text-red-500" />
                </div>
                <strong className="text-black text-sm">
                  30 days money back guarantee
                </strong>
              </div>
            </div>
            {/* tab */}
            <div className="bg-gray-100 rounded-full p-1 flex gap-2 w-max mt-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-black rounded-full transition ${
                    activeTab === tab
                      ? 'bg-white shadow-md'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <hr className="border-gray-300 my-4" />
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-between items-center">
              <strong>KEY FEATURES</strong>
              <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
                <IconOn />
              </button>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-between items-center">
              <strong>INGREDIENTS</strong>
              <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
                <IconOn />
              </button>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="border-b py-3 flex justify-between items-center">
              <strong className="text-black">HOW TO USE</strong>
              <button className="w-6 h-6 flex items-center justify-center bg-green-900 rounded-full">
                <IconIn />
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-2 mb-5 w-full max-w-full">
              Using vitamin C supplements effectively involves understanding the
              appropriate dosage, the form that best suits your needs, and the
              timing of intake. Here are some guidelines.
            </p>
            <hr className="border-gray-300 my-4" />
            <div className="flex justify-between items-center">
              <strong>QUALITY</strong>
              <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
                <IconOn />
              </button>
            </div>
            <hr className="border-gray-300 my-4 mb-5" />
          </div>
        </div>
      </div>
      {/* Easy-to-swallow */}
      <div className="flex justify-center gap-4 bg-[#E8ECEA] mb-10 flex-wrap md:flex-nowrap">
        <img
          src="../../public/image/tree.png"
          alt=""
          className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]"
        />
        <img
          src="../../public/image/image 47.png"
          alt=""
          className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]"
        />
        <img
          src="../../public/image/image 48.png"
          alt=""
          className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]"
        />
        <img
          src="../../public/image/image 49.png"
          alt=""
          className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]"
        />
      </div>
      {/* // Reviews & Rating */}{' '}
      <div className="">
        <div className="text-center ">
          {' '}
          <strong className="text-3xl" style={{fontFamily: 'Recoleta, serif'}}>
            Reviews & Rating
          </strong>
        </div>
        <div className="max-w-[1280px] mx-auto ">
          {/* cột review1 */}
          <div className="">
            <div className="flex justify-center gap-5 mt-10 mb-10 flex-wrap md:flex-nowrap">
              <div className="">
                {' '}
                <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="../../public/image/anh1.jpg"
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">Aspen Siphron</p>
                          <p className="text-sm text-gray-500">May 12, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <p className="font-semibold">4.9</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 mt-3 w-full max-w-full">
                      I've been using Nature's Best Vitamin C 1000 mg tablets
                      for six months, and the results are fantastic. My immune
                      system feels stronger—I haven't had a single cold this flu
                      season. I've also noticed a boost in my energy levels
                      throughout the day.
                    </p>
                  </div>
                </div>
              </div>
              {/* review2 */}
              <div className="">
                {' '}
                <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="../../public/image/anh2.jpg"
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">Aspen Siphron</p>
                          <p className="text-sm text-gray-500">May 12, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <p className="font-semibold">4.9</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 mt-3 w-full max-w-full">
                      I've been using Nature's Best Vitamin C 1000 mg tablets
                      for six months, and the results are fantastic. My immune
                      system feels stronger—I haven't had a single cold this flu
                      season. I've also noticed a boost in my energy levels
                      throughout the day.
                    </p>
                  </div>
                </div>
              </div>
              {/* review3 */}
              <div className="">
                {' '}
                <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="../../public/image/anh3.jpg"
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">Aspen Siphron</p>
                          <p className="text-sm text-gray-500">May 12, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <p className="font-semibold">4.9</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 mt-3 w-full max-w-full">
                      I've been using Nature's Best Vitamin C 1000 mg tablets
                      for six months, and the results are fantastic. My immune
                      system feels stronger—I haven't had a single cold this flu
                      season. I've also noticed a boost in my energy levels
                      throughout the day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cột review2 */}
          <div className="">
            <div className="flex justify-center gap-5 mt-10 mb-10 flex-wrap md:flex-nowrap">
              <div className="">
                {' '}
                <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="../../public/image/anh5.jpg"
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">Aspen Siphron</p>
                          <p className="text-sm text-gray-500">May 12, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <p className="font-semibold">4.9</p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 mt-3 w-full max-w-full">
                      I've been using Nature's Best Vitamin C 1000 mg tablets
                      for six months, and the results are fantastic. My immune
                      system feels stronger—I haven't had a single cold this flu
                      season. I've also noticed a boost in my energy levels
                      throughout the day.
                    </p>
                  </div>
                </div>
              </div>
              {/* review2 */}{' '}
              <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="../../public/image/anh6.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">Aspen Siphron</p>
                        <p className="text-sm text-gray-500">May 12, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <p className="font-semibold">4.9</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mt-3 w-full max-w-full">
                    I've been using Nature's Best Vitamin C 1000 mg tablets for
                    six months, and the results are fantastic. My immune system
                    feels stronger—I haven't had a single cold this flu season.
                    I've also noticed a boost in my energy levels throughout the
                    day.
                  </p>
                </div>
              </div>
              {/* review3 */}
              <div className="">
                {' '}
                <div className="border rounded-xl p-4 shadow-md bg-white max-w-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="../../public/image/anh7.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">Aspen Siphron</p>
                        <p className="text-sm text-gray-500">May 12, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">⭐</span>
                      <p className="font-semibold">4.9</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mt-3 w-full max-w-full">
                    I've been using Nature's Best Vitamin C 1000 mg tablets for
                    six months, and the results are fantastic. My immune system
                    feels stronger—I haven't had a single cold this flu season.
                    I've also noticed a boost in my energy levels throughout the
                    day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Want to know more? */}
      <div className="text-center mt-10 ">
        <strong className="text-3xl" style={{fontFamily: 'Recoleta, serif'}}>
          Want to know more?
        </strong>
      </div>
      <div className="flex flex-col items-center">
        <div className="border-b py-3 flex justify-between items-center w-full max-w-[600px]">
          <div className="flex-1">
            <strong className="text-black">01. Is it safe?</strong>
            <p className="text-gray-600 text-sm mt-2 mb-5">
              Yes, it is a completely safe & FSSAI approved product.
            </p>
          </div>
          <button className="w-6 h-6 flex items-center justify-center bg-green-900 rounded-full">
            <IconIn />
          </button>
        </div>
      </div>
      <div className="max-w-[600px] mx-auto">
        <div className="flex justify-between items-center py-2">
          <strong className="text-gray-800">
            What is the role of Vitamin C in collagen synthesis?
          </strong>
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
            <IconOn />
          </button>
        </div>
        <hr className="border-gray-300" />
      </div>
      <div className="max-w-[600px] mx-auto">
        <div className="flex justify-between items-center py-2">
          <strong className="text-gray-800">
            How much Vitamin C is needed by the body?
          </strong>
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
            <IconOn />
          </button>
        </div>
      </div>
      <div className="max-w-[600px] mx-auto">
        <div className="flex justify-between items-center py-2">
          <strong className="text-gray-800">
            What symptoms indicate Vitamin C deficiency?
          </strong>
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
            <IconOn />
          </button>
        </div>
        <hr className="border-gray-300" />
      </div>
      <div className="max-w-[600px] mx-auto mb-10">
        <div className="flex justify-between items-center py-2">
          <strong className="text-gray-800">
            How do I know that I need Vitamin C?
          </strong>
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300">
            <IconOn />
          </button>
        </div>
        <hr className="border-gray-300" />
      </div>
    </div>
  );
}
