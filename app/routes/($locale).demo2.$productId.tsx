import {json, useLoaderData, useParams} from '@remix-run/react';
import {LoaderFunction} from '@remix-run/node';
import {useState} from 'react';

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
  console.log('Fetching product with ID:', params.productId);

  const response = await fetch(
    `https://dummyjson.com/products/${params.productId}`,
  );

  if (!response.ok) {
    console.error('Product not found:', response.status);
    throw new Response('Product not found', {status: 404});
  }

  const product = (await response.json()) as Product;
  console.log('Fetched product:', product);

  return json(product);
};

export default function ProductDetail() {
  const product = useLoaderData<Product>();
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    alert(`Mua ngay ${quantity} sản phẩm!`);
  };

  return (
    <div className="container1 mx-auto p-6 bg-white rounded-lg flex gap-7 ">
      <div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg my-4"
        />
      </div>
      <div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-lg font-semibold text-gray-500">
            Đánh giá: ⭐ {product.rating}
          </p>
          <p className="text-2xl font-bold text-red-500">${product.price}</p>
        </div>

        <div className="flex items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="px-6 py-2 border">{quantity}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <div className="mt-6 flex space-x-4 mb-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
        <div className="mb-3">
          <strong>Mô tả </strong>
          <p className="text-lg text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
