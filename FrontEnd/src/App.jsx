import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './screens/Home/Home';
import Cart from './screens/Cart/Cart';
import PlaceOrder from './screens/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopUp/LoginPopUp';
import { useState } from 'react';
import Verify from './screens/Verify/Verify.jsx';
import MyOrders from './screens/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Display Login Popup if showLogin is true */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
