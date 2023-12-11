import React, { useEffect } from 'react';
import '../../assets/scss/molecules.scss';
import { TfiCheck } from 'react-icons/tfi';
import { LiaTimesSolid } from 'react-icons/lia';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { triggerRejectConnectionRequest } from '../../Features/connections/connections_slice';
import { triggerAcceptConnectionRequest } from '../../Features/connections/connections_slice';

const RequestCard = ({
  item,
  getPendingRequestConnectionsLocal,
  setGetPendingRequestConnectionsLocal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { acceptConnectionRequest, rejectConnectionRequest } = useSelector(
    (state) => state.connections
  );

  const handleRejectConnection = () => {
    const values = { connectionId: item.connectionId };
    dispatch(triggerRejectConnectionRequest(values));
  };
  const handleAcceptConnection = () => {
    const values = { connectionId: item.connectionId };
    dispatch(triggerAcceptConnectionRequest(values));
  };

  useEffect(() => {
    const getPendingRequestConnectionsLocalTemp = [
      ...getPendingRequestConnectionsLocal,
    ];
    console.log(
      'getPendingRequestConnectionsLocalTemp',
      getPendingRequestConnectionsLocalTemp
    );
    if (acceptConnectionRequest.status === 'successful') {
      getPendingRequestConnectionsLocalTemp.forEach((item) => {
        if (item.connectionId === acceptConnectionRequest.data.connectionId) {
          item.connectionRequestStatus = 'accepted';
        }
      });
      setGetPendingRequestConnectionsLocal(
        getPendingRequestConnectionsLocalTemp
      );
    }
    if (rejectConnectionRequest.status === 'successful') {
      getPendingRequestConnectionsLocalTemp.forEach((item) => {
        if (item.connectionId === rejectConnectionRequest.data.connectionId) {
          item.connectionRequestStatus = 'rejected';
        }
      });
      setGetPendingRequestConnectionsLocal(
        getPendingRequestConnectionsLocalTemp
      );
    }
  }, [acceptConnectionRequest, rejectConnectionRequest]);
  console.log(
    'getPendingRequestConnectionsLocalTemp',
    getPendingRequestConnectionsLocal
  );
  console.log('acceptConnectionRequest', acceptConnectionRequest);
  return (
    <div className='request-card bg-color-card'>
      {/* Forum that the user belongs to is supposed to be here, based on the design. Commented for now cause it's not in response */}
      {/* <h5 className='text-color-secondary-bold'>
        Joined: {moment(item.senderCreateDate).fromNow()}
      </h5> */}
      <img
        onClick={() => navigate(`/users/${item?.senderUserId}`)}
        src={item.senderImageUrl}
        alt='forum-img'
        className=''
      />
      <h3
        onClick={() => navigate(`/users/${item?.senderUserId}`)}
      >{`${item.senderFirstName} ${item.senderSecondName}`}</h3>
      <p>Interests: {item.senderProfession}</p>
      {item.connectionRequestStatus === 'accepted' ? (
        <>Accepted</>
      ) : item.connectionRequestStatus === 'rejected' ? (
        <>Rejected</>
      ) : (
        <>
          <div className='btns'>
            <button className='reject' onClick={handleRejectConnection}>
              <LiaTimesSolid className='icon' />
            </button>
            <button className='accept' onClick={handleAcceptConnection}>
              <TfiCheck className='icon' />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestCard;
