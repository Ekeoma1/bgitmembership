import React from "react";
import "../assets/scss/navFooter.scss";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <nav className="">
      <div className="container">
        <div className="nav-divider">
          <img src={Logo} alt="bgit logo" width="50" />

          <div className="d-lg-none menu-btn-wrapper">
            <button>
              <Icon icon="menu" />
            </button>
          </div>
          <div className="row d-lg-flex d-none mx-0 align-items-center justify-content-end">
            <div className="col-3 px-0 text-center">
              <Link className="menu-item" to="#">
                Community Forums
              </Link>
            </div>
            <div className="col-2 px-0 text-center">
              <Link className="menu-item" to="#">
                Events & News <Icon icon="chevronDown" />
              </Link>
            </div>
            <div className="col-2 px-0 text-center">
              <Link className="menu-item" to="#">
                Job Board
              </Link>
            </div>
            <div className="col-2 px-0 text-center">
              <Link className="menu-item" to="#">
                Resources <Icon icon="chevronDown" />
              </Link>
            </div>
            <div className="col-2 left-menu-border px-0 text-end">
              <Link className="menu-item login-link" to="login">
                Log in / Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
