import React from 'react';
import '../../assets/scss/modal.scss';
import Icon from '../Icon';
import { FiLink2 } from 'react-icons/fi';
import { FaInstagram, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ShareModal = ({ reportAction, show, action }) => {
  const navigate = useNavigate();
  return (
    <div className={`share-box-modal shadow-sm ${!show && 'd-none'}`}>
      <button
        onClick={() => {
          console.log('hello');
        }}
        className='acct-btn'
      >
        <FiLink2 />
        <span>Copy link </span>
      </button>
      <Link
        to='https://twitter.com/intent/tweet?text=Hello%20world'
        target='_blank'
      >
        <button
          onClick={() => {
            // console.log('hello');
          }}
          className='acct-btn'
        >
          <FaTwitter />
          <span>Share on Twitter </span>
        </button>
      </Link>
      <Link
        to='https://twitter.com/intent/tweet?text=Hello%20world'
        target='_blank'
      >
        <button
          onClick={() => {
            // console.log('hello');
          }}
          className='acct-btn'
        >
          <FaInstagram />
          <span>Share on Instagram </span>
        </button>
      </Link>
      <Link
        to='https://twitter.com/intent/tweet?text=Hello%20world'
        target='_blank'
      >
        <button
          onClick={() => {
            // console.log('hello');
          }}
          className='acct-btn'
        >
          <FaLinkedin />
          <span>Share on LinkedIn</span>
        </button>
      </Link>
    </div>
  );
};

export default ShareModal;
