// productProvider.jsx
import React, { useState } from "react";
import ProductContext from "./productContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, cart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
