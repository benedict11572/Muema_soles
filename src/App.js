import './App.css';
import { Routes, Route } from "react-router-dom";

import Register from './Components/Register';
import Login from './Components/Login';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Ensure Bootstrap Icons is imported

import GetProducts from './Components/GetProducts';
import AddProduct from './Components/AddProduct'; // Ensure the file name matches exactly
import AppNavbar from './Components/AppNavbar';

import MpesaPayment from './Components/MpesaPayment';


import Footer from './Components/footer';
import ShoeCarousel from './Components/Carousel';
import { Carousel } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <br /><br />
      <ShoeCarousel/>
      <div className="App">
        <AppNavbar />
        <header className="App-header">
          <Routes>
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/' element={<GetProducts />} />
            <Route path='/AddProduct' element={<AddProduct />} />
            <Route path='/MpesaPayment' element={<MpesaPayment />} />
          </Routes>
        </header>
      </div>
      <Footer/>
    </>
  );
}

export default App;
