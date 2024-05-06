// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
import ProductContext from "../productContext";

function Home({ addToCart }) {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=12"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <>
      <br />
      <br />
      <br />
      <div className="App animation">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : (
            products &&
            products.map((product) => (
              <div key={product.id} className="col card">
                <div
                  className="card-header animation-header"
                  style={{ height: "auto", overflow: "hidden" }}
                >
                  {product.title}
                </div>
                <div className="card-body animation-body">
                  <div className="image-container">
                    {product.image && (
                      <div className="position-relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="anime"
                          style={{ maxWidth: "100%", height: "70%" }}
                        />
                      </div>
                    )}
                  </div>
                  <p>Price: ${product.price}</p>
                  <p>Category: {product.category}</p>
                  <button
                    type="button"
                    className="btn btn-warning btn-xs"
                    data-bs-toggle="modal"
                    data-bs-target={`#myModal${product.id}`}
                  >
                    Click For More
                  </button>
                </div>
                <div className="modal fade" id={`myModal${product.id}`}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">{product.title}</h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                        ></button>
                      </div>
                      <div className="modal-body" style={{ height: "300px" }}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ maxWidth: "auto", height: "250px" }}
                        />
                        <h4 style={{ overflow: "hidden" }}>About Product</h4>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          onClick={() => addToCart(product)}
                        >
                          Add To Cart
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <Link to="/" className="rep">
            <button className="pads stop">Previous</button>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/product2" className="rep">
            <button className="pads go">Next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
