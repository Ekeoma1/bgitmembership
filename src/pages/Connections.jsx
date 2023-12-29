import React, { useEffect, useState } from 'react';
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
import OutsideClickHandler from 'react-outside-click-handler';

const Connections = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getConnectionsByUserId } = useSelector((state) => state.connections);
  const { getUserByProfileId } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const data = { queryParams: { userId: params.id } };
    dispatch(triggerGetConnectionsByUserId(data));
  }, []);
  // console.log('getConnectionsByUserId', getConnectionsByUserId);
  console.log('searchTerm', searchTerm);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  useEffect(() => {
    if (searchTerm) {
      setShowSearchModal(true);
      const users = [...getConnectionsByUserId.data?.connections];
      const searchedUsers = users
        ?.filter(
          (user) =>
            user.receiverFirstName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            user.receiverSecondName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            user.receiverCity
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            user.receiverProfession
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);
      setSearchedUsers(searchedUsers);
    } else {
      setShowSearchModal(false);
      setSearchedUsers([]);
    }
  }, [searchTerm]);

  console.log('searchusers', searchedUsers);
  
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
            <div className='search-box-wrapper'>
              {getConnectionsByUserId.status === 'base' ||
              getConnectionsByUserId.status === 'loading' ? (
                <></>
              ) : getConnectionsByUserId.status === 'successful' ? (
                <SearchBox
                  placeholder='Search connections'
                  name={'search-term'}
                  value={searchTerm}
                  setValue={setSearchTerm}
                />
              ) : (
                <></>
              )}
              {showSearchModal && (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowSearchModal(false);
                  }}
                >
                  <div className='search-modal-con shadow-sm'>
                    {searchedUsers.length > 0 && (
                      <div className='people'>
                        <div className='users'>
                          {searchedUsers.map((user, index) => (
                            <div
                              onClick={() =>
                                navigate(`/users/${user.receiverUserId}`)
                              }
                              className='user-con'
                              key={index}
                            >
                              <img
                                src={user.receiverImageUrl}
                                alt=''
                                className=''
                              />
                              <div className='wrapper'>
                                <div className='info'>
                                  <div className='name'>{`${user.receiverFirstName} ${user.receiverSecondName}`}</div>
                                  <div className='role'>
                                    {user.receiverProfession}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchedUsers.length === 0 && <p>No results found...</p>}
                  </div>
                </OutsideClickHandler>
              )}
            </div>
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
