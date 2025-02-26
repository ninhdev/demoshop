import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Link } from '@remix-run/react';

const PRODUCT_LIST = `#graphql
  query productlist
   {

  products(first:10) {
  		nodes{
        title
        handle
      }
  }
}
`


export async function loader({ context }: LoaderFunctionArgs) {



  const  data  = await context.storefront.query(PRODUCT_LIST,);

  console.log(data);

  return data.products.nodes; 
  
}

export default function ExampleTest() {

  const products = useLoaderData<typeof loader>(); 

  return (
      <div>
        <h1>Product List</h1>

        <ul>

          {products.map((product) => (

            <li key={product.handle}>

              <Link to={`/example/${product.handle}`}></Link>

              {product.title}</li>))}
            <li></li>
        </ul>
      </div>   
    );
}
