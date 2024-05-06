// CartProvider.jsx
import React, { createContext, useState, useContext } from "react";
import ProductContext from "./productContext";

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      // Check if the item is already in the cart
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its quantity
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        // If the item is not in the cart, add it with quantity 1
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
