import React, { useEffect } from 'react';
import '../../assets/scss/modal.scss';
import OutsideClickHandler from 'react-outside-click-handler';
import MainButton from '../Molecules/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCloseAccount,
  triggerCloseAccount,
} from '../../Features/users/users_slice';
import { logout, resetSignIn } from '../../Features/auth/auth_slice';
import { renderToast } from '../Molecules/CustomToastify';

const CloseAccountModal = ({ show, hide }) => {
  const { closeAccount } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(triggerCloseAccount());
  };

  useEffect(() => {
    if (closeAccount.status === 'successful') {
      if (closeAccount.data.user.status === 'Inactive') {
        renderToast({
          status: 'success',
          message: 'You have successfully disabled your account',
        });
        setTimeout(() => {
          dispatch(logout());
          dispatch(resetSignIn());
        }, 3000);
      }
      hide();
      dispatch(resetCloseAccount());
    }
  }, [closeAccount.data?.user?.status, closeAccount?.status]);
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
            loading={closeAccount.status === 'loading'}
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
    </OutsideClickHandler>
  );
};

export default CloseAccountModal;
