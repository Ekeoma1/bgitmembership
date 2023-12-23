import React, { useEffect } from 'react';
import '../assets/scss/connections.scss';
import ConnectionCard from '../components/connection/ConnectionCard';
import SearchBox from '../components/Molecules/SearchBox';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerGetAcceptedConnections,
  triggerGetConnectionsByUserId,
} from '../Features/connections/connections_slice';

const Connections = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getConnectionsByUserId } = useSelector((state) => state.connections);
  const { getUserByProfileId } = useSelector((state) => state.users);

  useEffect(() => {
    const data = { queryParams: { userId: params.id } };
    dispatch(triggerGetConnectionsByUserId(data));
  }, []);
  console.log('getConnectionsByUserId', getConnectionsByUserId);
  return (
    <section className='connection-page'>
      <div className='container'>
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className='text-color22' />
        </button>

        <div className='connections-wrapper'>
          <div className='connection-head'>
            <h2>
              {getConnectionsByUserId.data?.connectionCount}{' '}
              {`Connection${
                getConnectionsByUserId.data?.connectionCount > 1 ? 's' : ''
              }`}
            </h2>
            <SearchBox placeholder='Search connections' />
          </div>
          <div className='connections-body'>
            {getConnectionsByUserId.status === 'base' ||
            getConnectionsByUserId.status === 'loading' ? (
              <>Loading...</>
            ) : getConnectionsByUserId.status === 'successful' ? (
              <>
                {getConnectionsByUserId.data.connections.length === 0 ? (
                  <>No connections</>
                ) : (
                  <>
                    {getConnectionsByUserId.data.connections.map(
                      (item, index) => (
                        <ConnectionCard key={index} user={item} />
                      )
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connections;
