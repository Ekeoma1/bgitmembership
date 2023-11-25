import { useEffect, useState } from 'react';
import '../assets/scss/home.scss';
import Post from '../components/home/Post';
import CommunityForums from '../components/home/CommunityForumsComponent';
import MyUpdates from '../components/home/MyUpdates';
import Icon from '../components/Icon';
import Resources from '../components/home/Resources';
import img from '../assets/images/admin.svg';
import defaultForum from '../assets/images/forumDefault.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetUsers } from '../Features/users/users_slice';
import { triggerGetAllForums } from '../Features/forums/forums_slice';
import OutsideClickHandler from 'react-outside-click-handler';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUsers } = useSelector((state) => state.users);
  const { getAllForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedForums, setSearchedForums] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetUsers(data));
    const data2 = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data2));
  }, []);
  useEffect(() => {
    if (searchTerm) {
      setShowSearchModal(true);
      const users = [...getUsers.data?.users];
      const searchedUsers = users
        ?.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.secondName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);
      setSearchedUsers(searchedUsers);
      const forums = [...getAllForums.data];
      const searchedForums = forums
        ?.filter(
          (forum) =>
            forum.forumName.toLowerCase().includes(searchTerm.toLowerCase())
          // forum.secondName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3);
      setSearchedForums(searchedForums);
    } else {
      setShowSearchModal(false);
    }
  }, [searchTerm]);
  return (
    <div className='home-wrapper'>
      <div className='container'>
        <div className='search-box-wrapper ms-auto d-lg-block d-none'>
          {getUsers.status === 'successful' &&
          getAllForums.status === 'successful' ? (
            <div className='input-con'>
              <input
                onChange={handleChange}
                value={searchTerm}
                type='text'
                placeholder='Search members or forums'
              />
              <Icon icon='searchIcon' />
            </div>
          ) : (
            <div className='loading-state'></div>
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
                    <h5 className='title'>People</h5>
                    <div className='users'>
                      {searchedUsers.map((user, index) => (
                        <div
                          onClick={() => navigate(`/users/${user.userId}`)}
                          className='user-con'
                          key={index}
                        >
                          <img src={user.imageUrl} alt='' className='' />
                          <div className='wrapper'>
                            <div className='info'>
                              <div className='name'>{`${user.firstName} ${user.secondName}`}</div>
                              <div className='role'>{user.profession}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {searchedForums.length > 0 && (
                  <div className='forums'>
                    <h5 className='title'>Forums</h5>
                    <div className='users'>
                      {searchedForums.map((forum, index) => (
                        <div
                          key={index}
                          className='user-con'
                          onClick={() => navigate(`/forums/${forum.forumId}`)}
                        >
                          <img
                            src={forum.forumImageUrl ?? defaultForum}
                            alt=''
                            className=''
                          />
                          <div className='wrapper'>
                            <div className='info'>
                              <div className='name'>{forum.forumName}</div>
                              <div className='role'>
                                {forum.userCount} Members
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {searchedUsers.length == 0 && searchedForums.length === 0 && (
                  <p>No results found...</p>
                )}
              </div>
            </OutsideClickHandler>
          )}
        </div>
        <div className='row mt-lg-5'>
          <div className='col-3 d-lg-block d-none'>
            <MyUpdates />
            <Resources />
          </div>
          <div className='col-lg-6 col-12'>
            <Post />
          </div>
          <div className='col-3 d-lg-block d-none'>
            <CommunityForums />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
