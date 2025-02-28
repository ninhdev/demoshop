import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@remix-run/server-runtime';
import '../styles/shop.css';
import {useEffect, useState} from 'react';

interface Product {
  title: string;
  handle: string;
}

export const loader = async ({
  params,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const {handle} = params;

  if (!handle) {
    throw new Response('Thiếu handle của sản phẩm', {status: 400});
  }

  try {
    const data = await storefront.query(SHOPPRODUCT_QUERY, {
      variables: {handle},
    });

    if (!data || !data.product) {
      throw new Response('Không có dữ liệu sản phẩm', {status: 404});
    }

    return json({data});
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error);
    throw new Response('Lỗi khi lấy dữ liệu từ API', {status: 500});
  }
};

export default function ShopProduct() {
  const {data} = useLoaderData<typeof loader>();
  const [search, setSearch] = useState('');
  const [filteredProduct, setFilteredProduct] = useState<Product | null>(
    data?.product ?? null,
  );

  useEffect(() => {
    if (data.product?.title.toLowerCase().includes(search.toLowerCase())) {
      setFilteredProduct(data.product);
    } else {
      setFilteredProduct(null);
    }
  }, [search, data.product]);

  return (
    <div>
      <h1>Thông tin sản phẩm</h1>
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{marginBottom: '20px', padding: '10px', width: '100%'}}
      />
      {filteredProduct ? (
        <div>
          <h2>{filteredProduct.title}</h2>
          <p>
            <strong>Handle:</strong> {filteredProduct.handle}
          </p>
        </div>
      ) : (
        <p>Không tìm thấy sản phẩm</p>
      )}
    </div>
  );
}

const SHOPPRODUCT_QUERY = `#graphql
query Shopproduct($handle: String!) {
  product(handle: $handle) {
    title
    handle
  }
}`;
