import React from 'react';
import '../../assets/scss/modal.scss';
// 1 for block, 2 for unblock, 3 for mute
const IndividualActionModal = ({ show, tab, close }) => {
  const handleBlock = () => {
    // console.log('block');
    close()
  };
  const handleMute = () => {
    // console.log('mute');
    close()
  };
  return (
    <div className={`individual-action-modal shadow ${!show && 'd-none'}`}>
      {tab === 1 && (
        <div className='block-content modal-content-con'>
          <div className='header text-center'>Block @Jenny Smith</div>
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
