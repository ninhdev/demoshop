import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import type { Product } from '~/data/types';
import { Link } from '~/components/Link';
import { routeHeaders } from '~/data/cache';



export const headers = routeHeaders;
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  
  if (!id) {
    throw new Response('Product ID is required', { status: 400 });
  }

  console.log('Fetching product with ID:', id);

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Response('Product not found', { status: 404 });
  }

  const product: Product = await response.json();

  console.log('Product:', product);
  return json({ product });
};

export default function ProductDetail() {
  const { product } = useLoaderData<{ product: Product }>();
  
  return (
    <div className="max-w-7xl mx-auto p-6">
  {/* Infor product */}
  <h2 className="text-3xl font-bold p-5 bg-gray-600 text-white">
  
  {product.category}
  </h2>

  <div className="flex flex-col lg:flex-row items-start gap-8 pt-2">
    {/* Display images */}
    {product.images?.length > 0 ? (
      <div className="flex flex-col gap-4">
        {product.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={product.title}
            className="w-80 h-80 object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">Không có hình ảnh nào.</p>
    )}

    <div className="flex-1 space-y-4">
      <p className="text-2xl font-semibold">{product.title}</p>
    <div className="flex items-center gap-2">
      <span className="text-xl text-red-500 font-semibold">
        ${product.price.toFixed(2)}
      </span>
      <span className="font-bold text-red-500 bg-neutral-50 ">-{product.discountPercentage}%</span>  
    </div>     
      <p className="text-lg text-gray-700">{product.description}</p>
    </div>
    <div className="flex items-center">
          
          <span>{product.rating} / 5</span>
    </div>
    <div className="">
          <p><strong>Danh mục:</strong> {product.category}</p>
          <p><strong>Thương hiệu:</strong> {product.brand}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Số lượng còn:</strong> {product.stock} ({product.availabilityStatus})</p>
          <p><strong>Bảo hành:</strong> {product.warrantyInformation}</p>
          <p><strong>Vận chuyển:</strong> {product.shippingInformation}</p>
          <p><strong>Chính sách trả hàng:</strong> {product.returnPolicy}</p>
          <p><strong>Kích thước:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
          <p><strong>Mã vạch:</strong> {product.meta.barcode}</p>
          <img src={product.meta.qrCode} alt="QR Code" className="w-32 h-32" />
        </div>
  </div>
</div>

  );
}
