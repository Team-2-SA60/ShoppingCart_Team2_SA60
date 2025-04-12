import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './pages/OrderList';
import Login from './pages/Login';
import CartDetails from './pages/CartDetails';
import { SessionProvider } from './context/SessionContext';
import HomePage from './pages/HomePage';
import CreateAccount from './pages/CreateAccount';


const App = () => {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/category/:category' element={<HomePage />} />
          <Route path='/login' exact={true} element={<Login />} />
          <Route path='/orders' exact={true} element={<OrderList />} />
          <Route path='/orders/:status' exact={true} Component={OrderList} />
          <Route path='/cart' exact={true} element={<CartDetails />} />
          <Route path='/account/create' exact={true} element={<CreateAccount />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </SessionProvider>
  )
}

export default App;