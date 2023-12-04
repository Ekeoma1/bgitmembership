import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button
      className={`scroll-to-top-component ${scrollHeight > 300 && 'show'}`}
      onClick={handleClick}
      type='submit'
    >
      <FaChevronUp />
    </button>
  );
};

export default ScrollToTop;
