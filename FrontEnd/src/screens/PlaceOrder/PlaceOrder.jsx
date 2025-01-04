import React, { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { use } from "react";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, food_list, cartItems, url, token } = useContext(StoreContext);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
  
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
  
    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 29;
    const orderData = {
      address: deliveryInfo,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee,
    };
  
    try {
      let response = await axios.post(url + `/api/order/place`, orderData, { headers: { token } });
      console.log("Order Response:", response.data);  // Check entire response
  
      if (response.data && response.data.session_url) {
        const { session_url } = response.data;  // Accessing session_url directly from response.data
        window.location.replace(session_url);
      } else {
        console.error("Session URL not found in response:", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 29;
  const total = getTotalCartAmount() + deliveryFee;


  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }
  }, [token]);

  return (
    <div className="place-order">
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <form onSubmit={handleProceedToPayment}>
          <div className="row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={deliveryInfo.firstName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={deliveryInfo.lastName}
              onChange={onChangeHandler}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={deliveryInfo.email}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={deliveryInfo.street}
            onChange={onChangeHandler}
          />
          <div className="row">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={deliveryInfo.zipCode}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={deliveryInfo.country}
              onChange={onChangeHandler}
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={deliveryInfo.phone}
            onChange={onChangeHandler}
          />
          <button type="submit">
          Proceed to Payment
          </button>
        </form>
      </div>
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${deliveryFee}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
