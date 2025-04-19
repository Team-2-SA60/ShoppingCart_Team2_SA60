import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import CartDetails from './pages/CartDetails';
import { SessionProvider } from './context/SessionContext';
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';
import ManageAccount from './pages/ManageAccount';
import Checkout from "./pages/Checkout";
import WishListPage from './pages/WishListPage';


const App = () => {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/category/:category' element={<HomePage />} />
          <Route path='/wishlist' element={<WishListPage />} />
          <Route path='/login' element={<Login />} />
          <Route exact path='/orders' element={<OrderList />} />
          <Route path='/orders/:status' Component={OrderList} />
          <Route path='/cart' element={<CartDetails />} />
          <Route path='/create_account' element={<CreateAccount />} />
          <Route path='/account' element={<ManageAccount />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </SessionProvider>
  )
}

export default App;