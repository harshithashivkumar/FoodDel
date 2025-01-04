import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        console.log(success, orderId,response.data)
        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [url, success, orderId, navigate]); // Add dependencies to the array

  return (
    <div className="verify">
      <div className="spinner">
        
      </div>
    </div>
  );
};

export default Verify;
