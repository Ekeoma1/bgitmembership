import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/updates.scss';
import _ from 'lodash';
import RequestCard from '../Molecules/RequestCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import EmptyState from '../Molecules/EmptyState';
import SingleLineLoader, {
  SingleLineLoader2,
} from '../Atoms/skeleton-loaders/SingleLineLoader';
import { renderToast } from '../Molecules/CustomToastify';
import {
  resetAcceptConnectionRequest,
  resetRejectConnectionRequest,
} from '../../Features/connections/connections_slice';
import { useParams } from 'react-router-dom';
import { resetAcceptForumJoinRequest, resetRejectForumJoinRequest } from '../../Features/forums-membership/forums_membership_slice';

const Requests = ({ forum }) => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const {
    getPendingRequestConnections,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useSelector((state) => state.connections);
  const {
    getPendingJoinRequestsByForumId,
    rejectForumJoinRequest,
    acceptForumJoinRequest,
  } = useSelector((state) => state.forumsMembership);
  const [
    getPendingRequestConnectionsLocal,
    setGetPendingRequestConnectionsLocal,
  ] = useState([]);
  const [
    getPendingJoinRequestsByForumIdLocal,
    setGetPendingJoinRequestsByForumIdLocal,
  ] = useState([]);
  const [activeRequest, setActiveRequest] = useState({});
  useEffect(() => {
    if (getPendingRequestConnections.status === 'successful') {
      setGetPendingRequestConnectionsLocal(
        getPendingRequestConnections.data?.pendingRequests
      );
    }
    if (getPendingJoinRequestsByForumId.status === 'successful') {
      setGetPendingJoinRequestsByForumIdLocal(
        getPendingJoinRequestsByForumId.data?.pendingRequests
      );
    }
  }, [getPendingRequestConnections, getPendingJoinRequestsByForumId]);

  useEffect(() => {
    const data = _.cloneDeep(getPendingRequestConnectionsLocal);
    const setBactToDefault = () => {
      data.forEach((item) => {
        if (item.connectionId === activeRequest.connectionId) {
          delete item.requestStatus;
        }
      });
      setGetPendingRequestConnectionsLocal(data);
      setActiveRequest({});
    };
    // accept connection request
    if (acceptConnectionRequest.status === 'loading') {
      data.forEach((item) => {
        if (item.connectionId === activeRequest.connectionId) {
          item.requestStatus = 'loading';
        }
      });
      setGetPendingRequestConnectionsLocal(data);
    } else if (acceptConnectionRequest.status === 'successful') {
      if (acceptConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection accepted successfully',
        });
        data.forEach((item) => {
          if (item.connectionId === activeRequest.connectionId) {
            item.connectionStatus = 'Connected';
          }
        });
        setGetPendingRequestConnectionsLocal(data);
      }
      dispatch(resetAcceptConnectionRequest());
      setBactToDefault();
    } else if (acceptConnectionRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetAcceptConnectionRequest());
      setBactToDefault();
    }

    // reject connection request
    if (rejectConnectionRequest.status === 'loading') {
      data.forEach((item) => {
        if (item.connectionId === activeRequest.connectionId) {
          item.requestStatus = 'loading';
        }
      });
      setGetPendingRequestConnectionsLocal(data);
    } else if (rejectConnectionRequest.status === 'successful') {
      if (rejectConnectionRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection rejected successfully',
        });
        data.forEach((item) => {
          if (item.connectionId === activeRequest.connectionId) {
            item.connectionStatus = 'Not Connected';
          }
        });
        setGetPendingRequestConnectionsLocal(data);
      }
      dispatch(resetRejectConnectionRequest());
      setBactToDefault();
    } else if (rejectConnectionRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetRejectConnectionRequest());
      setBactToDefault();
    }
  }, [acceptConnectionRequest, rejectConnectionRequest]);

  // forum requests
  useEffect(() => {
    const setBactToDefault = () => {
      const data = getPendingJoinRequestsByForumIdLocal.map((item) => {
        const obj = { ...item };
        if (
          item.pendingRequest.forumMemberId ===
          activeRequest.pendingRequest.forumMemberId
        ) {
          delete obj.requestStatus;
        }
        return obj;
      });
      setGetPendingJoinRequestsByForumIdLocal(data);
      setActiveRequest({});
    };

    // accept join forum request
    if (acceptForumJoinRequest.status === 'loading') {
      console.log('######loading');

      const data = getPendingJoinRequestsByForumIdLocal.map((item) => {
        const obj = { ...item };
        if (
          item.pendingRequest.forumMemberId ===
          activeRequest.pendingRequest.forumMemberId
        ) {
          console.log('true##');
          obj.requestStatus = 'loading';
        }
        return obj;
      });
      console.log('dtat temp', data);
      setGetPendingJoinRequestsByForumIdLocal(data);
    } else if (acceptForumJoinRequest.status === 'successful') {
      if (acceptForumJoinRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Forum join request accepted successfully',
        });
        const data = getPendingJoinRequestsByForumIdLocal.map((item) => {
          const obj = { ...item };
          if (
            item.pendingRequest.forumMemberId ===
            activeRequest.pendingRequest.forumMemberId
          ) {
            obj.connectionStatus = 'Connected';
          }
          return obj;
        });
        setGetPendingJoinRequestsByForumIdLocal(data);
      }
      dispatch(resetAcceptForumJoinRequest());
      setBactToDefault();
    } else if (acceptForumJoinRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetAcceptForumJoinRequest());
      setBactToDefault();
    }

    // reject join forum request
    if (rejectForumJoinRequest.status === 'loading') {
      const data = getPendingJoinRequestsByForumIdLocal.map((item) => {
        const obj = { ...item };
        if (
          item.pendingRequest.forumMemberId ===
          activeRequest.pendingRequest.forumMemberId
        ) {
          obj.requestStatus = 'loading';
        }
        return obj;
      });
      setGetPendingJoinRequestsByForumIdLocal(data);
    } else if (rejectForumJoinRequest.status === 'successful') {
      if (rejectForumJoinRequest.data.status === 'success') {
        renderToast({
          status: 'success',
          message: 'Connection rejected successfully',
        });
        const data = getPendingJoinRequestsByForumIdLocal.map((item) => {
          const obj = { ...item };
          if (
            item.pendingRequest.forumMemberId ===
            activeRequest.pendingRequest.forumMemberId
          ) {
            obj.connectionStatus = 'Not Connected';
          }
          return obj;
        });
        setGetPendingJoinRequestsByForumIdLocal(data);
      }
      dispatch(resetRejectForumJoinRequest());
      setBactToDefault();
    } else if (rejectForumJoinRequest.status === 'error') {
      renderToast({
        status: 'error',
        message: 'Something went wrong',
      });
      dispatch(resetRejectForumJoinRequest());
      setBactToDefault();
    }
  }, [acceptForumJoinRequest, rejectForumJoinRequest]);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };
  console.log('local', getPendingJoinRequestsByForumIdLocal);
  console.log('active', activeRequest);
  return (
    <div className='requests-wrapper'>
      <div className='container'>
        <div className='requests-section-content'>
          {!forum && (
            <>
              <div className='section-title-wrapper'>
                <h5 className=''>
                  Requests{' '}
                  {getPendingRequestConnections.status === 'base' ||
                  getPendingRequestConnections.status === 'loading' ? (
                    <div className='loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getPendingRequestConnections.status === 'successful' ? (
                    <span>{`(${getPendingRequestConnections.data?.pendingRequests?.length})`}</span>
                  ) : (
                    <></>
                  )}
                </h5>
              </div>
              <div className='requests-cards-wrapper'>
                {getPendingRequestConnections.status === 'base' ||
                getPendingRequestConnections.status === 'loading' ? (
                  <div className='container loader-con'>
                    <ForumCardsLoader2 />
                  </div>
                ) : getPendingRequestConnections.status === 'successful' ? (
                  <>
                    {getPendingRequestConnectionsLocal.length === 0 ? (
                      <EmptyState
                        title={'No connection requests'}
                        info={'See our latest News & Events below.'}
                        height={'50rem'}
                      />
                    ) : (
                      <>
                        <Carousel responsive={responsive}>
                          {getPendingRequestConnectionsLocal.map(
                            (request, index) => (
                              <RequestCard
                                key={request.connectionId}
                                request={request}
                                setActiveRequest={setActiveRequest}
                              />
                            )
                          )}
                        </Carousel>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
          {forum && (
            <>
              <div className='section-title-wrapper'>
                <h5 className=''>
                  Forum Requests{' '}
                  {getPendingJoinRequestsByForumId.status === 'base' ||
                  getPendingJoinRequestsByForumId.status === 'loading' ? (
                    <div className='loader'>
                      <SingleLineLoader />
                    </div>
                  ) : getPendingJoinRequestsByForumId.status ===
                    'successful' ? (
                    <span>{`(${getPendingJoinRequestsByForumId.data?.pendingRequests?.length})`}</span>
                  ) : (
                    <></>
                  )}
                </h5>
              </div>
              <div className='requests-cards-wrapper'>
                {getPendingJoinRequestsByForumId.status === 'base' ||
                getPendingJoinRequestsByForumId.status === 'loading' ? (
                  <div className='container loader-con'>
                    <ForumCardsLoader2 />
                  </div>
                ) : getPendingJoinRequestsByForumId.status === 'successful' ? (
                  <>
                    {getPendingJoinRequestsByForumIdLocal?.length === 0 ? (
                      <EmptyState
                        title={'No connection requests'}
                        info={'See our latest News & Events below.'}
                        height={'50rem'}
                      />
                    ) : (
                      <>
                        <Carousel responsive={responsive}>
                          {getPendingJoinRequestsByForumIdLocal.map(
                            (request, index) => {
                              console.log('request', request);
                              return (
                                <RequestCard
                                  key={index}
                                  request={request}
                                  setActiveRequest={setActiveRequest}
                                  forum={forum}
                                />
                              );
                            }
                          )}
                        </Carousel>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
