import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../Icon';
import {
  resetRemoveConnection,
  triggerGetConnectionsByUserId,
  triggerRemoveConnection,
} from '../../Features/connections/connections_slice';
import { useDispatch, useSelector } from 'react-redux';
import { renderToast } from '../Molecules/CustomToastify';

const ConnectionCard = ({ withoutAction, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAction, setShowAction] = useState(false);
  const { getMyProfile, getUserProfileById } = useSelector(
    (state) => state.users
  );
  const { removeConnection } = useSelector((state) => state.connections);
  const toggleAction = () => {
    setShowAction(!showAction);
  };
  // console.log('user', user);
  const params = useParams();
  useEffect(() => {
    if (removeConnection.status === 'successful') {
      renderToast({
        status: 'success',
        message: 'Connection successfully removed',
      });
      dispatch(resetRemoveConnection());
      const data = { queryParams: { userId: params.id } };
      dispatch(triggerGetConnectionsByUserId(data));
    }
  }, [removeConnection]);

  return (
    <div className='connection-card shadow'>
      {!withoutAction ? (
        <>
          <div className='connection-details'>
            <div
              className='connection-img'
              onClick={() => navigate(`/users/${user?.receiverUserId}`)}
            >
              <img src={user.receiverImageUrl} alt='' className='' />
            </div>
            <div className='nameRole-wrapper'>
              <h3
                className='name'
                onClick={() => navigate(`/users/${user?.receiverUserId}`)}
              >{`${user.receiverFirstName} ${user.receiverSecondName}`}</h3>
              <div className='role'>{user.receiverProfession}</div>
            </div>
          </div>
          <div className={`connection-action ${withoutAction && 'd-none'}`}>
            {getMyProfile.data?.userId === params.id && (
              <>
                <Link to='#'>
                  <div className='msg-btn d-lg-flex d-none'>Message</div>
                  <span className='d-lg-none'>
                    <Icon icon='envelope' />
                  </span>
                </Link>
                <button onClick={() => toggleAction()}>
                  <Icon icon='elipse-horizontal' />
                </button>
              </>
            )}

            <div
              className={`delete-connection-wrapper ${
                !showAction && 'd-none'
              } `}
              onClick={() => {
                dispatch(
                  triggerRemoveConnection({
                    receiveruserId: user.receiverUserId,
                  })
                );
              }}
            >
              <Icon icon='deleteIcon' />
              Remove connection
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='connection-details'>
            <div
              className='connection-img'
              onClick={() => navigate(`/users/${user?.userId}`)}
            >
              <img src={user.user.imageUrl} alt='user' className='' />
            </div>
            <div className='nameRole-wrapper'>
              <h3
                className='name'
                onClick={() => navigate(`/users/${user?.userId}`)}
              >{`${user.user.firstName} ${user.user.secondName}`}</h3>
              <div className='role'>{user.user.profession}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionCard;
