import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {formatTitle} from '~/lib/utils';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductItem = ({product}: {product: Product}) => {
  return (
    <li key={product.id}>
      <Image
        src={product.images[0]}
        alt={product.title}
        style={{
          width: '100%',
          height: '200px',
        }}
      />
      <h2>
        <Link to={`/${product.title}`}>{formatTitle(product.title)}</Link>
      </h2>
      <div className="one">
        <p className="price"> ${product.price}</p>
        <p className="rating"> {product.rating}★</p>
      </div>
      <p>{product.description}</p>
    </li>
  );
};

export default ProductItem;
