import React from 'react';
import '../../assets/scss/modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { triggerBlockUser, triggerMuteUser } from '../../Features/account-privacies/account_privacies_slice';
// 1 for block, 2 for unblock, 3 for mute
const IndividualActionModal = ({ show, tab, close }) => {
  const { getUserProfileById } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleBlock = () => {
    const values = { userId: getUserProfileById.data?.userId };
    dispatch(triggerBlockUser(values));
    close();
  };
  const handleMute = () => {
    const values = { userId: getUserProfileById.data?.userId };
    dispatch(triggerMuteUser(values));
    close();
  };
  return (
    <div className={`individual-action-modal shadow ${!show && 'd-none'}`}>
      {tab === 1 && (
        <div className='block-content modal-content-con'>
          <div className='header text-center'>
            Block{' '}
            {`${getUserProfileById.data?.firstName} ${getUserProfileById.data?.secondName}`}
          </div>
          <div className='content'>
            They will not be able to connect, or be able view your posts and
            can’t send you messages. You will also not see any notifications or
            posts from them.
          </div>

          <div className='btn-wrapper text-center'>
            <button onClick={handleBlock} className='block-btn bttn'>
              Block
            </button>
            <button onClick={close} className='bttn cancel-btn'>
              Cancel
            </button>
          </div>
        </div>
      )}

      {tab === 3 && (
        <div className='mute-content modal-content-con'>
          <div className='header text-center'>Mute @Jenny Smith</div>
          <div className='content'>
            You will not see posts from them on your feed.
          </div>

          <div className='btn-wrapper text-center'>
            <button onClick={handleMute} className='regular-btn bttn'>
              Mute
            </button>
            <button onClick={close} className='bttn cancel-btn'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualActionModal;
