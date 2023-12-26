import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import { TfiCheck } from 'react-icons/tfi';
import { LiaTimesSolid } from 'react-icons/lia';
import _ from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetRejectConnectionRequest,
  triggerRejectConnectionRequest,
} from '../../Features/connections/connections_slice';
import { triggerAcceptConnectionRequest } from '../../Features/connections/connections_slice';
import { renderToast } from './CustomToastify';

const RequestCard = ({
  request,
  getPendingRequestConnectionsLocal,
  setGetPendingRequestConnectionsLocal,
  activeRequests,
  setActiveRequests,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { acceptConnectionRequest, rejectConnectionRequest } = useSelector(
    (state) => state.connections
  );
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');
  const handleRejectConnection = () => {
    const values = { connectionId: request.connectionId };
    dispatch(triggerRejectConnectionRequest(values));
    const data = [...activeRequests].filter(
      (item) => item.connectionId !== request.connectionId
    );
  };
  const handleAcceptConnection = () => {
    const values = { connectionId: request.connectionId };
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

  useEffect(() => {
    if (
      request?.connectionId &&
      activeRequests?.connectionId &&
      request?.connectionId === activeRequests?.connectionId
    ) {
      const dataTemp = _.cloneDeep(getPendingRequestConnectionsLocal);
      const data = [...dataTemp];
      // reject connection request
      if (rejectConnectionRequest.status === 'loading') {
        data.forEach((item) => {
          if (item.connectionId === activeRequests.connectionId) {
            item.connectionRequestStatus = 'loading';
          }
        });
        setGetPendingRequestConnectionsLocal(data);
        dispatch(resetRejectConnectionRequest());
      }
      if (rejectConnectionRequest.status === 'successful') {
        if (
          rejectConnectionRequest.data === 'You are the admin of the forum.'
        ) {
          renderToast({
            status: 'error',
            message: rejectConnectionRequest.data,
          });
        } else {
          renderToast({
            status: 'success',
            message: rejectConnectionRequest.data,
          });
          data.forEach((item) => {
            if (item.connectionId === activeRequests.connectionId) {
              item.connectionRequestStatus = 'rejected';
            }
          });
          setGetPendingRequestConnectionsLocal(data);
        }
        dispatch(resetRejectConnectionRequest());
      } else if (rejectConnectionRequest.status === 'error') {
        renderToast({
          status: 'error',
          message: 'Something went wrong',
        });
        dispatch(resetRejectConnectionRequest());
      }

      // // cancel Join forum request
      // if (cancelJoinForumRequest.status === 'successful') {
      //   if (
      //     cancelJoinForumRequest.data === 'Join request canceled successfully.'
      //   ) {
      //     renderToast({
      //       status: 'success',
      //       message: cancelJoinForumRequest.data,
      //     });
      //     data.forEach((item) => {
      //       if (item.connectionId === activeRequest.connectionId) {
      //         item.forumMembershipStatus = 'NotAMember';
      //       }
      //     });
      //     setGetPendingRequestConnectionsLocal(data);
      //     dispatch(resetCanceljoinForumRequest());
      //   }
      // } else if (cancelJoinForumRequest.status === 'error') {
      //   renderToast({
      //     status: 'error',
      //     message: 'Something went wrong',
      //   });
      //   dispatch(resetCanceljoinForumRequest());
      // }
    }
  }, [rejectConnectionRequest.status, acceptConnectionRequest.status]);
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
        onClick={() => navigate(`/users/${request?.senderUserId}`)}
        src={request.senderImageUrl}
        alt='forum-img'
        className=''
      />
      <h3
        onClick={() => navigate(`/users/${request?.senderUserId}`)}
      >{`${request.senderFirstName} ${request.senderSecondName}`}</h3>
      <p>Interests: {request.senderProfession}</p>
      {request.connectionRequestStatus === 'loading' ? (
        <>Loading...</>
      ) : request.connectionRequestStatus === 'accepted' ? (
        <>Accepted</>
      ) : request.connectionRequestStatus === 'rejected' ? (
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
