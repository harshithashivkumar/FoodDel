import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const url = "https://fooddelbackend-j53f.onrender.com";
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = food_list.find((food) => food._id === itemId);
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  const fetchFoodlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (currentToken) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: currentToken } });
    setCartItems(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const ContextValues = {
    token,
    setToken,
    url,
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return <StoreContext.Provider value={ContextValues}>{props.children}</StoreContext.Provider>;
};

export { StoreContextProvider };
