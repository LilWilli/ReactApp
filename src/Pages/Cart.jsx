import React, { useContext } from "react";
import ProductContext from "../productContext";

function Cart() {
  const { cart } = useContext(ProductContext);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="App">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Cart;
