/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from 'react';
import './Modal.css';

const ModalBox = ({ show, onClose, children, from, width }) => {
  return (
    <div
      className={`${from != null ? `modal-${from}` : 'modal'} ${
        show ? 'show' : ''
      }`}
      onClick={onClose}
    >
      <div
        className={`${
          from != null ? `modal-content-${from}` : 'modal-content'
        } card-bg2`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ width: width != null ? width : '' }}
      >
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'></div>
      </div>
    </div>
  );
};

export default ModalBox;
