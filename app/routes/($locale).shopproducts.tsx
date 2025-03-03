import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@remix-run/server-runtime';
import '../styles/shop.css';
import {useEffect, useState} from 'react';
interface Product {
  __typename: string;
  id: string;
  description?: string;
  createdAt: string;
  handle: string;
  category?: {
    name: string;
    id: string;
  };
}

interface ShopProductsData {
  products: {
    nodes: Product[];
  };
}

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const data = await storefront.query(SHOPPRODUCT_QUERY);
  if(!data || !data.products){
    throw new Response('không có dữ liệu sản phẩm',{status:500})
  }
  return json({data});
}

export default function ShopProducts() {
  const {data} = useLoaderData<typeof loader>();
  // const [search, setSearch] = useState('');
  // const [filterProducts, setFilterProducts] = useState(data.products.nodes);
  // useEffect(() => {
  //   setFilterProducts(
  //     data.products.nodes.filter((product) =>
  //       product.description?.toLowerCase().includes(search.toLocaleLowerCase()),
  //     ),
  //   );
  // }, [search, data.products.nodes]);
 const [search,setSearch]=useState('');
 const [filterProducts,setFilterProducts]=useState(data.products.nodes);
 useEffect(()=>{
  setFilterProducts(
    data.products.nodes.filter((product)=>
      product.description.toLowerCase().includes(search.toLocaleLowerCase())
    )
  )
 },[search,data.products.nodes])
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <input
        type="text"
        placeholder="tìm kiếm theo mô tả"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{marginBottom: '20px', padding: '10px', width: '100%'}}
      />
      {filterProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.__typename}</h2>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Mô tả:</strong> {product.description || 'Không có mô tả'}
          </p>
          <p>
            <strong>Ngày sản xuất:</strong> {product.createdAt}
          </p>
          <p>
            <strong>Quản lý:</strong> {product.handle}
          </p>
          {product.category && (
            <>
              <p>
                <strong>Tên loại sản phẩm:</strong> {product.category.name}
              </p>
              <p>
                <strong>ID loại sản phẩm:</strong> {product.category.id}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
const SHOPPRODUCT_QUERY = `#graphql
query Shopproducts{
 products(first:10) {
    nodes{
      __typename
      id
      description
      createdAt
      handle
      category{
        name
        id
      }
    }
  }
}
`;
