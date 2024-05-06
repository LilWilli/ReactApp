// productContext.js
import React, { createContext, useState } from "react";

const ProductContext = createContext([]);

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <ProductContext.Provider value={{ cart, setCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
