import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  const products: Product[] = [
    {id: 1, name: 'Laptop', price: 1200, category: 'Electronics'},
    {id: 2, name: 'Phone', price: 800, category: 'Electronics'},
    {id: 3, name: 'Shirt', price: 30, category: 'Clothing'},
    {id: 4, name: 'Shoes', price: 100, category: 'Clothing'},
  ];

  console.log(products);
  return json({products});
};

export default function Demo() {
  const {products} = useLoaderData<{products: Product[]}>();
  console.log(products);

  const clothingProducts = products.filter(
    (product: Product) => product.category === 'Clothing',
  );

  const productNames = products.map((product: Product) => product.name);

  return (
    <div>
      <h2>Danh sách phần đối tượng có category là Clothing</h2>
      <ul>
        {clothingProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      <h2>Danh sách sản phẩm</h2>
      <ul>
        {productNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
