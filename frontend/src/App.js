import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import CartDetails from './pages/CartDetails';
import { SessionProvider } from './context/SessionContext';
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/category/:category' exact={true} Component={HomePage} />
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/orders' exact={true} element={<OrderList />} />
          <Route path='/cart' exact={true} element={<CartDetails />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </SessionProvider>
  )
}

export default App;