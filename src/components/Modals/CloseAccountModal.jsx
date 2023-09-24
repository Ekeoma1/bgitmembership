import React, { useEffect } from 'react';
import '../../assets/scss/modal.scss';
import OutsideClickHandler from 'react-outside-click-handler';
import MainButton from '../Molecules/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCloseAccount,
  triggerCloseAccount,
} from '../../Features/users/users_slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../../Features/auth/auth_slice';

const CloseAccountModal = ({ show, hide }) => {
  const { closeAccount } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(triggerCloseAccount());
    hide();
  };
  const notify = () => toast('You have successfully disabled your account');

  useEffect(() => {
    if (closeAccount.status === 'successful') {
      if (closeAccount.data.user.status === 'Inactive') {
        notify();
        dispatch(logout());
      }
      dispatch(resetCloseAccount());
    }
  }, [closeAccount.status]);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        hide();
      }}
    >
      <div className={`close-account-modal ${!show && 'd-none'}`}>
        <div className='text-center mb-3'>
          Are you sure you want to close your BGIT membership account?
        </div>

        <div className='d-flex gap-3 align-items-center flex-column'>
          <MainButton
            text={'Yes'}
            size={'small'}
            onClick={handleSubmit}
            width={'17.5rem'}
          />

          <MainButton
            text={'No'}
            size={'small'}
            onClick={() => hide()}
            width={'17.5rem'}
            outlined
          />
        </div>
      </div>
      <ToastContainer />
    </OutsideClickHandler>
  );
};

export default CloseAccountModal;
