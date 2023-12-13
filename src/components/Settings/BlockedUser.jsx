import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUnblockUser,
  triggerGetBlockedUsers,
} from '../../Features/account-privacies/account_privacies_slice';
import { triggerUnblockUser } from '../../Features/account-privacies/account_privacies_slice';
import { renderToast } from '../Molecules/CustomToastify';
import BlockedUsersLoader from '../Atoms/skeleton-loaders/settings-page/BlockedUsersLoader';

const blockedList = [
  {
    name: 'Janet Roch',
    role: 'Freelance UX/UI Designer',
  },
  {
    name: 'Abie Ansah',
    role: 'UX Design Enthusiast',
  },
  {
    name: 'Clare David',
    role: 'Senior User Researcher',
  },
];
const BlockedUser = () => {
  const dispatch = useDispatch();
  const { getBlockedUsers, unblockUser } = useSelector(
    (state) => state.accountPrivacies
  );
  console.log(getBlockedUsers);
  const [actionModal, setActionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleConfirmUnblock = () => {
    const values = { userId: selectedUser.userId };
    dispatch(triggerUnblockUser(values));
    setActionModal(false);
  };
  const [getBlockedUsersLocal, setGetBlockedUsersLocal] = useState([]);
  useEffect(() => {
    dispatch(triggerGetBlockedUsers());
  }, []);
  useEffect(() => {
    if (getBlockedUsers.status === 'successful' && getBlockedUsers.data) {
      setGetBlockedUsersLocal([...getBlockedUsers.data]);
    }
  }, [getBlockedUsers]);
  useEffect(() => {
    if (unblockUser.status === 'successful') {
      renderToast({
        status: 'success',
        message: unblockUser.data,
      });
      dispatch(triggerGetBlockedUsers());
      // setGetBlockedUsersLocal(
      //   getBlockedUsersLocal.filter(
      //     (user) => user.userId !== unblockUser.data.userId
      //   )
      // );
      dispatch(resetUnblockUser());
    }
  }, [unblockUser]);
  console.log('getBlockedUsers', getBlockedUsers);
  return (
    <div className='mt-4'>
      <p>
        When you block someone, they won’t be able to follow or message you and
        you won’t see notifications from them.
      </p>
      {getBlockedUsers.status === 'base' ||
      getBlockedUsers.status === 'loading' ? (
        <>
          <BlockedUsersLoader />
        </>
      ) : getBlockedUsers.status === 'successful' ? (
        <>
          {getBlockedUsersLocal.length === 0 ? (
            <></>
          ) : (
            <>
              {getBlockedUsersLocal.map((user, index) => (
                <div
                  key={index}
                  className='mt-3 d-flex justify-content-between align-items-center flex-wrap'
                >
                  <div className='d-flex flex-wrap align-items-center gap-3'>
                    <div className='blocked-user-img '>
                      <img
                        src={user.imageUrl}
                        alt='blocked user profile'
                        className=''
                      />
                    </div>

                    <div className='blocked-user-details'>
                      <div className='name'>{`${user.firstName} ${user.secondName}`}</div>
                      <div className='role'>{user.profession}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActionModal(true);
                      setSelectedUser(user);
                    }}
                    className='unblock-btn'
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      ) : getBlockedUsers.status === 'error' ? (
        <></>
      ) : (
        <></>
      )}

      <div className={`unblock-modal ${!actionModal && 'd-none'}`}>
        <div className='text-center'>
          Are you sure you want to unblock this person?
        </div>

        <div className='d-flex justify-content-center flex-wrap align-items-center gap-3 mt-3'>
          <div className='blocked-user-img '>
            <img
              src={selectedUser.imageUrl}
              alt='blocked user profile '
              className=''
            />
          </div>

          <div className='blocked-user-details'>
            <div className='name'>{`${selectedUser.firstName} ${selectedUser.secondName}`}</div>
            <div className='role'>{selectedUser.profession}</div>
          </div>
        </div>

        <div className='mt-3 d-flex justify-content-center gap-3 flex-wrap'>
          <button
            onClick={handleConfirmUnblock}
            className='secondary-btn small-btn'
          >
            Yes
          </button>
          <button
            onClick={() => setActionModal(false)}
            className='primary-btn small-btn'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
