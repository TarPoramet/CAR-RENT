import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from './Login.js'
import Home from './home.js'
import Register from './Register.js'
import Insertproduct from './insertproduct.js'
import Productdetail from './productdetail.js'
import Manageproduct from './manageproduct.js'
import Editproduct from './editproduct.js'

import Insert_new from './insert_new.js'
import Showproduct_new from './showproduct_new.js'
import Car_detail from './car_detail.js'
import History from './history.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/manageproduct" element={<Manageproduct />} />
      <Route path="/insertproduct" element={<Insertproduct />} />
      <Route path="/productdetail/:id" element={<Productdetail />} /> 
      {/* <Route path="/editproduct/:id" element={<Editproduct />} />  */}
      
      <Route path="/editproduct/:id" element={<Editproduct />} />
      <Route path="/insert_new" element={<Insert_new />} />
      <Route path="/showproduct_new" element={<Showproduct_new />} />
      <Route path="/car_detail/:id" element={<Car_detail />} />
      <Route path="/history" element={<History />} />

    </Routes>
  </BrowserRouter>
);


reportWebVitals();
