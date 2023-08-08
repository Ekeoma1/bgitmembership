import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFooterNav from "./components/MobileFooterNav";
import { useSelector } from "react-redux";

const Layout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {isLoggedIn && <MobileFooterNav />}
    </>
  );
};

export default Layout;
