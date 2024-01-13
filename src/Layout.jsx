import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileFooterNav from './components/MobileFooterNav';
import { useSelector } from 'react-redux';
import PostModal from './components/home/PostModal';

const Layout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { showPostModalMobile } = useSelector((state) => state.other);

  return (
    <div
      className='layout'
      style={{ position: showPostModalMobile ? 'fixed' : '' }}
    >
      <PostModal />
      <Navbar />
      <Outlet />
      <Footer />
      {isLoggedIn && <MobileFooterNav />}
    </div>
  );
};

export default Layout;
