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

const Requests = ({ forum }) => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const {
    getPendingRequestConnections,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useSelector((state) => state.connections);
  const { getPendingJoinRequestsByForumId } = useSelector(
    (state) => state.forumsMembership
  );
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
        getPendingRequestConnections.data.pendingRequests
      );
    }
    if (getPendingJoinRequestsByForumId.status === 'successful') {
      setGetPendingJoinRequestsByForumIdLocal(
        getPendingJoinRequestsByForumId.data.pendingRequests
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
                    {getPendingJoinRequestsByForumIdLocal.length === 0 ? (
                      <EmptyState
                        title={'No connection requests'}
                        info={'See our latest News & Events below.'}
                        height={'50rem'}
                      />
                    ) : (
                      <>
                        <Carousel responsive={responsive}>
                          {getPendingJoinRequestsByForumIdLocal.map(
                            (request, index) => (
                              <RequestCard
                                key={index}
                                request={request}
                                setActiveRequest={setActiveRequest}
                                forum={forum}
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
        </div>
      </div>
    </div>
  );
};

export default Requests;
