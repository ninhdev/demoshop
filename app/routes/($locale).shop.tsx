import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@remix-run/server-runtime';

interface ShopData {
  shop: {
    name: string;
    id: string;
    description?: string;
    moneyFormat: string;
    brand?: {
      slogan?: string;
      shortDescription?: string;
    };
  };
}

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const data = await storefront.query(PRODUCTS_QUERY);

  return json({data});
};

export default function ProductsPage() {
  const {data} = useLoaderData<typeof loader>();
  console.log(data);

  // return null;

  return (
    <div>
      <h1>danh sách sản phẩm</h1>
      {data ? (
        <div>
          <h1>{data.shop.name}</h1>
          <p>
            <strong>ID:</strong>
            {data.shop.id}
          </p>
          <p>
            <strong>Mô tả:</strong>
            {data.shop.description || 'không có mô tả'}
          </p>
          <p>
            <strong>Định dạng tiền tệ:</strong>
            {data.shop.moneyFormat}
          </p>
          <p>
            <strong>Khẩu hiệu:</strong>
            {data.shop?.brand?.slogan}
          </p>
          <p>
            <strong>Mô tả ngắn:</strong>
            {data.shop?.brand?.shortDescription}
          </p>
        </div>
      ) : (
        <p>đang tải dữ liệu.....</p>
      )}
    </div>
  );
}
const PRODUCTS_QUERY = `#graphql
  query Products {
    shop {
      name
      id
      description
      moneyFormat
      brand {
        slogan
        shortDescription
      }
    }
  }
`;
