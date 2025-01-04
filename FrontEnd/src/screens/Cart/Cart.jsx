import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Cart = () => {
  const navigate = useNavigate(); // Hook to navigate
  const { food_list, cartItems, removeFromCart, addToCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((food) => {
          if (cartItems[food._id] > 0)
            return (
              <div className="cart-item" key={food._id}> {/* Assign unique key */}
                <div className="cart-items-title">
                  <img src={`${url}/images/${food.image}`} alt={food.name} />
                  <p>{food.name}</p>
                  <p>₹{food.price}</p>
                  <div className="quantity-counter">
                    <img
                      src={assets.remove_icon_red}
                      onClick={() => removeFromCart(food._id)}
                      alt="Remove"
                    />
                    <p>{cartItems[food._id]}</p>
                    <img
                      src={assets.add_icon_green}
                      onClick={() => addToCart(food._id)}
                      alt="Add"
                    />
                  </div>
                  <p>&#8377;{cartItems[food._id] * food.price}</p>
                </div>
                <hr />
              </div>
            );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-box">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 29}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                &#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 29}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
        </div>

        <div className="cart-promocode">
          <p>If you have the promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
