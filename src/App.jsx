// App.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Layout from "./Pages/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Product3 from "./Pages/Product3.jsx";
import Cart from "./Pages/Cart.jsx";
import Product2 from "./Pages/Product2.jsx";
import NoPage from "./Pages/NoPage.jsx";
import Admin from "./Pages/Admin.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductContext from "./productContext"; // Import ProductContext

function App() {
  const { setProducts } = useContext(ProductContext);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        setNetworkError(true);
        console.log(`Error: ${error}`);
      }
    };
    fetchCategories();
  }, []);

  const fetchByCategory = async (category) => {
    try {
      let response;
      if (category === "All Categories") {
        response = await axios.get("https://fakestoreapi.com/products");
      } else {
        response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
      }
      setProducts(response.data);
    } catch (error) {
      setNetworkError(true);
      console.log(`Error fetching products by category: ${error}`);
    }
  };

  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    setCart([...cart, product]);
  };

  return (
    <div>
      {networkError ? (
        <div>
          <p className="loader"></p>
        </div>
      ) : (
        <div>
          <div className="read"></div>
          <div className="display">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout cartCount={cartCount} />}>
                  <Route index element={<Home addToCart={addToCart} />} />
                  <Route
                    path="product2"
                    element={<Product2 addToCart={addToCart} />}
                  />
                  <Route path="cart" element={<Cart />} />
                  <Route
                    path="product3"
                    element={<Product3 addToCart={addToCart} />}
                  />
                  <Route
                    path="admin"
                    element={<Admin addToCart={addToCart} />}
                  />
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
          <div className="row">
            <div className="second-nav">
              <div>
                <ul className="sidenav">
                  <h3 className="header3">Categories:</h3>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => fetchByCategory("All Categories")}
                    className="bolt"
                  >
                    All Categories
                  </li>

                  {categories.map((category) => (
                    <li
                      key={category}
                      className="bolt"
                      style={{ cursor: "pointer" }}
                      onClick={() => fetchByCategory(category)}
                    >
                      {category[0].toUpperCase() + category.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
