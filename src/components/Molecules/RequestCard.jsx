import React, { useEffect, useState } from 'react';
import '../../assets/scss/molecules.scss';
import loadingDots from '../../../src/assets/images/loading_dots.gif';
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
import {
  triggerAcceptForumJoinRequest,
  triggerRejectForumJoinRequest,
} from '../../Features/forums-membership/forums_membership_slice';

const RequestCard = ({ request, setActiveRequest, forum }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReject = () => {
    if (!forum) {
      const values = { connectionId: request.connectionId };
      dispatch(triggerRejectConnectionRequest(values));
      setActiveRequest(request);
    } else {
      const values = { forumMemberId: request.pendingRequest.forumMemberId };
      const data = {
        queryParams: { forumMemberId: request.pendingRequest.forumMemberId },
      };
      dispatch(triggerRejectForumJoinRequest(values));
      setActiveRequest(request);
    }
  };
  const handleAccept = () => {
    if (!forum) {
      const values = { connectionId: request.connectionId };
      dispatch(triggerAcceptConnectionRequest(values));
      setActiveRequest(request);
    } else {
      const values = { forumMemberId: request.pendingRequest.forumMemberId };
      const data = {
        queryParams: { forumMemberId: request.pendingRequest.forumMemberId },
      };
      dispatch(triggerAcceptForumJoinRequest(values));
      setActiveRequest(request);
    }
  };
  return (
    <div className='request-card bg-color-cardd'>
      <div className='top'>
        {/* Forum that the user belongs to is supposed to be here, based on the design. Commented for now cause it's not in response */}
        {/* <h5 className='text-color-secondary-bold'>
        Joined: {moment(item.senderCreateDate).fromNow()}
      </h5> */}
        <img
          onClick={() =>
            navigate(
              `/users/${
                forum ? request?.pendingRequest.userId : request.senderUserId
              }`
            )
          }
          src={forum ? request.imageUrl : request.senderImageUrl}
          alt='forum-img'
          className=''
        />
        <h3
          onClick={() =>
            navigate(
              `/users/${
                forum ? request?.pendingRequest.userId : request.senderUserId
              }`
            )
          }
        >
          {forum
            ? `${request.firstName} ${request.secondName}`.length > 40
              ? `${request.firstName} ${request.secondName}`.substring(0, 40) +
                '...'
              : `${request.firstName} ${request.secondName}`
            : `${request.senderFirstName} ${request.senderSecondName}`.length > 40
            ? `${request.senderFirstName} ${request.senderSecondName}`.substring(0, 40) +
              '...'
            : `${request.senderFirstName} ${request.senderSecondName}`}
        </h3>
        <p>
          Interests: {forum ? request.profession : request.senderProfession}
        </p>
      </div>
      <>
        <div className='btns'>
          {request.requestStatus === 'loading' ? (
            <div className='connection loading'>
              Loading <img src={loadingDots} alt='loader' />
            </div>
          ) : request.connectionStatus === 'Connected' ? (
            <div className='connection connection-status'>Request accepted</div>
          ) : request.connectionStatus === 'Not Connected' ? (
            <div className='connection connection-status'>Request rejected</div>
          ) : (
            <>
              <button className='reject' onClick={handleReject}>
                <LiaTimesSolid className='icon' />
              </button>
              <button className='accept' onClick={handleAccept}>
                <TfiCheck className='icon' />
              </button>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default RequestCard;
