import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + '/api/order/userOrders', {}, { headers: { token } });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      console.log("Fetching user orders");
      fetchOrders(); // Initial fetch

      // Set an interval to fetch orders every 10 seconds
      const interval = setInterval(fetchOrders, 1000); // 10000 ms = 10 seconds

      // Cleanup the interval when the component unmounts or token changes
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div className="order-details">
              {order.items.length >= 3 ? (
                <div className="two-items-per-line">
                  {order.items.map((item, index) => (
                    <p key={index} className="food-item">
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && " , "}
                    </p>
                  ))}
                </div>
              ) : (
                order.items.map((item, index) => (
                  <p key={index} className="food-item">
                    {item.name} x {item.quantity}
                    {index !== order.items.length - 1 && " , "}
                  </p>
                ))
              )}
            </div>
            <p>₹ {order.amount}</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf; </span><b>{order.status}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
