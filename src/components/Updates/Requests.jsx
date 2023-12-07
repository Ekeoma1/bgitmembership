import React, { useEffect, useState } from 'react';
import '../../../src/assets/scss/updates.scss';
import request1 from '../../../src/assets/images/request1.svg';
import request2 from '../../../src/assets/images/request2.svg';
import request3 from '../../../src/assets/images/request3.svg';
import RequestCard from '../Molecules/RequestCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { ForumCardsLoader2 } from '../Atoms/skeleton-loaders/ForumCardsLoader';
import EmptyState from '../Molecules/EmptyState';
import SingleLineLoader, {
  SingleLineLoader2,
} from '../Atoms/skeleton-loaders/SingleLineLoader';

const Requests = ({ basedOn }) => {
  const { getPendingRequestConnections } = useSelector(
    (state) => state.connections
  );
  const [
    getPendingRequestConnectionsLocal,
    setGetPendingRequestConnectionsLocal,
  ] = useState([]);
  useEffect(() => {
    if (getPendingRequestConnections.status === 'successful') {
      setGetPendingRequestConnectionsLocal(
        getPendingRequestConnections.data.pendingRequests
      );
    }
  }, [getPendingRequestConnections]);

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
            getPendingRequestConnections.status === 'loading' ? (
              <div className='container loader-con'>
                <ForumCardsLoader2 />
              </div>
            ) : getPendingRequestConnections.status === 'successful' ? (
              <>
                {getPendingRequestConnections.data?.pendingRequests?.length ===
                0 ? (
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
                            item={request}
                            getPendingRequestConnectionsLocal={
                              getPendingRequestConnectionsLocal
                            }
                            setGetPendingRequestConnectionsLocal={
                              setGetPendingRequestConnectionsLocal
                            }
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
