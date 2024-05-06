// Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ cartCount }) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-sm bg-dark navbar-dark nav"
        style={{
          position: "fixed",
          padding: "20px",
          zIndex: "100",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            HomePage
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="collapsibleNavbar"
            style={{ marginLeft: "100px" }}
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  HomePage
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product2" className="nav-link">
                  Product2
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product3" className="nav-link">
                  Product3
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart ({cartCount})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
