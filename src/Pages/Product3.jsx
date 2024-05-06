import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductContext from "../productContext";

function Product3({ addToCart }) {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        // Remove quotes and square brackets from image URLs
        const modifiedProducts = response.data.map((product) => ({
          ...product,
          images: product.images.map((url) =>
            url.replace(/["[\]]/g, "")
          ), // Removed unnecessary escape character \
        }));

        setProducts(modifiedProducts);
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
      <br />
      <div className="App animation">
        <div className="row">
          {loading ? (
            <p className="App">Loading</p>
          ) : (
            products &&
            products.slice(0, 12).map((product) => (
              <div key={product.id} className="col card">
                <div className="card-header animation-header">
                  {product.title}
                </div>
                <div className="card-body animation-body">
                  {product.images.map((image, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={image}
                        alt={product.title}
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150"; // Replace broken image with a placeholder
                        }}
                      />
                    </div>
                  ))}
                  <p>Price: {product.price} dollars</p>
                  <p>Categories: Unisex {product.category.name}</p>
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
                      <div className="modal-body">
                        {product.images.map((image, index) => (
                          <div key={index} className="image-container">
                            <img
                              src={image}
                              alt={product.title}
                              className="product-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/150"; // Replace broken image with a placeholder
                              }}
                            />
                          </div>
                        ))}
                        <h4>About Product</h4>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category.name}</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            addToCart(product);
                          }}
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
          <Link to="/product2">
            <button className="pads stop">Previous</button>
          </Link>
          &nbsp; &nbsp; &nbsp;
          <Link to="/admin">
            <button className="pads go">Next</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Product3;
