import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ProductContext from "../productContext";
import "../App.css";

function Admin() {
  const { admin, setAdmin } = useContext(ProductContext);
  const [networkError, setNetworkError] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        setAdmin(response.data);
      } catch (error) {
        setNetworkError(false);
      }
    };
    fetchAdmin();
  }, [setAdmin]);
  return (
    <>
      <br />
      <br />
      <br />

      <div className="App">
        {networkError ? (
          <p>Loading..</p>
        ) : (
          <div className="row">
            <h1>This is the cart page for the amount of products Bought</h1>
            {admin &&
              admin.map((admins) => (
                <div key={admins.id} className="col">
                  <p>ID: {admins.id}</p>
                  <p>Username: {admins.username}</p>
                  <p>Email: {admins.email}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
