import React, {useEffect, useState} from 'react';
import '../../app/styles/app.css';
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

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                width: '100%',
                maxWidth: '1500px',
                height: '200px',
              }}
            />
            <h2>{product.title}</h2>
            <div className="one">
              <p className="price"> ${product.price}</p>
              <p className="rating"> {product.rating}★</p>
            </div>

            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
