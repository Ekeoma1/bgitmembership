import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ForumCardsLoader from '../Atoms/skeleton-loaders/ForumCardsLoader';
import { useDispatch } from 'react-redux';
import { triggerGetAllForums } from '../../Features/forums/forums_slice';
import ForumCard from '../Molecules/ForumCard';

const CommunityForumsComponent = () => {
  const { getAllForums } = useSelector((state) => state.forums);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllForums(data));
  }, []);
  return (
    <div className='community-forum-wrapper'>
      <div className='community-forum-card-wrapper shadow-sm'>
        <h3>Community Forums</h3>
        {getAllForums.status === 'loading' ? (
          <>
            <ForumCardsLoader />
          </>
        ) : getAllForums.status === 'successful' ? (
          <>
            {getAllForums.data?.length === 0 ? (
              <>
                <div className='empty-state'>Empty forums</div>
              </>
            ) : (
              <>
                {/* {getAllForums?.data?.slice(0, 3).map((forum, key) => {
                  return (
                    <div key={key} className='community-forum-card'>
                      <h4 className='mt-3'>{forum.forumName}</h4>
                      <div className='community-forum-content'>
                        {forum.details}
                      </div>
                      <div className='text-center'>
                        <button className='sec-btn smaller-text'>Join</button>
                      </div>
                    </div>
                  );
                })} */}
                {getAllForums.data.slice(0, 3).map((forum, index) => (
                  <ForumCard key={index} forum={forum} />
                ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}

        <div className='text-center my-4'>
          <Link
            to='/community-forums'
            className='sec-btn mx-auto c-gap-5 smallert-text added-width d-flex align-items-center justify-content-center'
          >
            <span>View all</span> <Icon icon='arrowRight' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityForumsComponent;
