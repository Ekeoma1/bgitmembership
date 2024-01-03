import React, { useEffect, useState } from 'react';
import '../assets/scss/connections.scss';
import ConnectionCard from '../components/connection/ConnectionCard';
import SearchBox from '../components/Molecules/SearchBox';
import { HiArrowLeft } from 'react-icons/hi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  triggerGetAcceptedConnections,
  triggerGetConnectionsByUserId,
} from '../Features/connections/connections_slice';
import OutsideClickHandler from 'react-outside-click-handler';
import { triggerGetForumMembersByForumId } from '../Features/forums-membership/forums_membership_slice';

const Connections = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getConnectionsByUserId } = useSelector((state) => state.connections);
  const { getForumMembersByForumId } = useSelector(
    (state) => state.forumsMembership
  );
  const { getUserByProfileId } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    if (location.pathname.includes('connections')) {
      const data = { queryParams: { userId: params.id } };
      dispatch(triggerGetConnectionsByUserId(data));
    } else if (location.pathname.includes('forums')) {
      const data = { queryParams: { forumId: params.id } };
      dispatch(triggerGetForumMembersByForumId(data));
    }
  }, []);
  useEffect(() => {
    if (location.pathname.includes('connections')) {
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
    } else if (location.pathname.includes('forums')) {
    }
  }, [searchTerm]);

  // console.log('searchusers', searchedUsers);
  // console.log('params', params);
  console.log('members', getForumMembersByForumId);

  // console.log('getConnectionsByUserId', getConnectionsByUserId);
  // console.log('searchTerm', searchTerm);

  return (
    <section className='connection-page'>
      <div className='container'>
        <button onClick={() => navigate(-1)}>
          <HiArrowLeft className='text-color22' />
        </button>
        {location.pathname.includes('connection') ? (
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
                  {getConnectionsByUserId.data?.connections?.length === 0 ? (
                    <>No connections</>
                  ) : (
                    <>
                      {getConnectionsByUserId.data?.connections?.map(
                        (item, index) => (
                          <ConnectionCard from={'connection'} key={index} user={item} />
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
        ) : location.pathname.includes('members') ? (
          <div className='connections-wrapper'>
            <div className='connection-head'>
              <h2>
                {getForumMembersByForumId.data?.connectionCount}{' '}
                {`Forum Members${
                  getForumMembersByForumId.data?.connectionCount > 1 ? 's' : ''
                }`}
              </h2>
              <div className='search-box-wrapper'>
                {getForumMembersByForumId.status === 'base' ||
                getForumMembersByForumId.status === 'loading' ? (
                  <></>
                ) : getForumMembersByForumId.status === 'successful' ? (
                  <SearchBox
                    placeholder='Search members'
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
              {getForumMembersByForumId.status === 'base' ||
              getForumMembersByForumId.status === 'loading' ? (
                <>Loading...</>
              ) : getForumMembersByForumId.status === 'successful' ? (
                <>
                  {getForumMembersByForumId.data?.connections?.length === 0 ? (
                    <>No connections</>
                  ) : (
                    <>
                      {getForumMembersByForumId.data[0]?.usersInForum?.map(
                        (item, index) => (
                          <ConnectionCard withoutAction key={index} user={item} />
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
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Connections;
