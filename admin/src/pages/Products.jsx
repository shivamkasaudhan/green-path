import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Products = () => {
  const [products, setProducts] = useState([]); // State to store product list
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products'); // Adjust URL if different
        if (response.ok) {
          const data = await response.json();
          setProducts(data.list); // Set the product list
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Unable to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-brandBlue">Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id} // Assuming `_id` is the unique identifier in your DB
                className="border p-4 rounded-md shadow-md"
              >
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="font-semibold text-green-500">Price: ${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
