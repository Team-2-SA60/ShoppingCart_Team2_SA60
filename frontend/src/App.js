import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import CartDetails from './pages/CartDetails';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<ProductList />} />
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/orders' exact={true} element={<OrderList />} />
          <Route path='/cart' exact={true} element={<CartDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;