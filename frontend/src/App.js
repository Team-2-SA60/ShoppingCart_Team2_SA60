import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<ProductList />} />
      </Routes>
    </Router>
  )
}

export default App;