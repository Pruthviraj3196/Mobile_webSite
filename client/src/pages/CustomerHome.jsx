import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 400); // 400ms throttle delay

    setTimeoutId(newTimeout);
  }, [products, timeoutId]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Mobile Store</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a mobile..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div
            key={p._id}
            onClick={() => navigate(`/products/${p._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
              <p className="text-lg text-indigo-600 font-medium mt-2">${p.price}</p>
              <p className="text-sm text-gray-500 mt-1">Click to view more details</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
