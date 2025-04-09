import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from "./components/AppNavbar";
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import CartDetails from "./pages/CartDetails";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<ProductList />} />
        <Route path='/login' exact={true} element={<Login />} />
        <Route path='/orders' exact={true} element={<OrderList />} />
          <Route path='/cart' exact={true} element={<CartDetails />} />
      </Routes>
    </Router>
  )
}

export default App;