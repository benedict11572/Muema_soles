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



import Footer from './Components/footer';

import AdminDashboard from './Components/AdminDashboard';

import { Carousel } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './Components/HomePage';
// pages
import Anemia from './pages/Anemia';
import Arthritis from './pages/Arthritis';
import CancerPrevention from './pages/CancerPrevention';
import DigestiveHealth from './pages/DigestiveHealth';
import HeartDisease from './pages/HeartDisease';
import Hypertension from './pages/Hypertension';
import Obesity from './pages/Obesity';
import WeakImmunity from './pages/WeakImmunity';
import Diabetes from './pages/Diabetes';
import DietPlanGenerator from './pages/DietPlanGenerator';

// more

import AboutProject from "./more/AboutProject"
import ContactPage from "./more/ContactPage"
import OrderForm from './Components/OrderForm';
import MpesaPayment from './pages/MpesaPayment';


function App() {
  return (
    <>
      <br /><br />
      
      <div className="App">
        <AppNavbar />
        <header className="App-header">
          <Routes>
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            <Route path="/admin" element={<AdminDashboard />} />
         
            <Route path='/Register' element={<Register />} />
            <Route path='/order' element={<OrderForm />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/gh' element={<GetProducts />} />
            <Route path="/" element={<HomePage/>}/>
           
            <Route path='/AddProduct' element={<AddProduct />} />
            <Route path='/MpesaPayment' element={<MpesaPayment />} />

            {/* pages */}
            <Route path='anemia' element={<Anemia/>}/>
            <Route path='arthritis' element={<Arthritis/>}/>
            <Route path='CancerPrevention' element={<CancerPrevention/>}/>
            <Route path='diabetes' element={<Diabetes/>}/>
            <Route path='digestiveHealth' element={<DigestiveHealth/>}/>
            <Route path='heartDisease' element={<HeartDisease/>}/>
            <Route path='hypertension' element={<Hypertension/>}/>
            <Route path='Obesity' element={<Obesity/>}/>
            <Route path='weakImmunity' element={<WeakImmunity/>}/>
            <Route path='DietPlanGenerator' element ={<DietPlanGenerator/>}/>

            {/* more */}

            <Route path='/about' element={<AboutProject/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
          </Routes>
        </header>
      </div>
      <Footer/>
    </>
  );
}

export default App;
