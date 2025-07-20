// resources/js/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TowingRequest from './pages/TowingRequest';
import axios from 'axios';
import '../css/app.css';

axios.defaults.withCredentials = true;

const App = () => (
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/towing-requests" element={<TowingRequest />} />
    </Routes>
  </BrowserRouter>
);

export default App;
