import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerHome from './pages/CustomerHome';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Redirector from './components/Redirector';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Redirector />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute role="customer">
              <CustomerHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
