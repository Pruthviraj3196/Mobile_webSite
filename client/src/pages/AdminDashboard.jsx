import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminDashboard = () => {
  const { token } = useSelector(state => state.user);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/api/products', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts([...products, res.data]);
    setForm({ name: '', price: '', description: '', imageUrl: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter(p => p._id !== id));
  };

  const handleUpdate = async () => {
    const res = await axios.put(`http://localhost:5000/api/products/${editingProductId}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.map(p => (p._id === editingProductId ? res.data : p)));
    setEditingProductId(null);
    setForm({ name: '', price: '', description: '', imageUrl: '' });
  };

  const startEditing = (product) => {
    setEditingProductId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="border p-2" placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
        
        {editingProductId ? (
          <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleUpdate}>Update Product</button>
        ) : (
          <button className="bg-blue-600 text-white p-2 rounded" onClick={handleCreate}>Create Product</button>
        )}
      </div>

      <ul className="space-y-2">
        {products.map(p => (
          <li key={p._id} className="border p-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p>${p.price}</p>
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => startEditing(p)} className="text-yellow-600">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
