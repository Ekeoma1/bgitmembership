import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/updates.scss';
import _ from 'lodash';
import request1 from '../../../src/assets/images/request1.svg';
import request2 from '../../../src/assets/images/request2.svg';
import request3 from '../../../src/assets/images/request3.svg';
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

const Requests = ({ basedOn }) => {
  const dispatch = useDispatch();
  const {
    getPendingRequestConnections,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useSelector((state) => state.connections);
  const [
    getPendingRequestConnectionsLocal,
    setGetPendingRequestConnectionsLocal,
  ] = useState([]);
  const [activeRequest, setActiveRequest] = useState({});
  useEffect(() => {
    if (getPendingRequestConnections.status === 'successful') {
      setGetPendingRequestConnectionsLocal(
        getPendingRequestConnections.data.pendingRequests
      );
    }
  }, [getPendingRequestConnections]);
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
  console.log('local', getPendingRequestConnectionsLocal);
  return (
    <div className='requests-wrapper'>
      <div className='container'>
        <div className='requests-section-content'>
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
            getPendingRequestConnections.status === 'loading'? (
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
        </div>
      </div>
    </div>
  );
};

export default Requests;
