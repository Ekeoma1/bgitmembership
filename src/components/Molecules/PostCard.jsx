import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
import '../../assets/scss/molecules.scss';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UserProfilePhotoLoader2 } from '../Atoms/skeleton-loaders/dashboard-page/UserProfilePhotoLoader';
import MediaLoader from '../Atoms/skeleton-loaders/home-page/MediaLoader';
import {
  resetToggleLikePost,
  triggerToggleLikePost,
} from '../../Features/posts/posts_slice';
import { useDispatch, useSelector } from 'react-redux';
const PostCard = ({ post }) => {
  // console.log('postsss', post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggleLikePost } = useSelector((state) => state.posts);
  const { getMyProfile } = useSelector((state) => state.users);
  const [profileImgOnLoadStatus, setProfileImgOnLoadStatus] = useState('base');
  const [postImgOnLoadStatus, setPostImgOnLoadStatus] = useState('base');
  const [postVideoOnLoadStatus, setPostVideoOnLoadStatus] = useState('base');
  const [idsOfUsersWhoHaveLikedThePost, setIdsOfUsersWhoHaveLikedThePost] =
    useState([]);
  const [liked, setLiked] = useState(false);
  const timeago = moment(post?.createdDate).fromNow();

  const handleLike = () => {
    setLiked(!liked);
    const data = { queryParams: { postId: post.postId } };
    dispatch(triggerToggleLikePost(data));
  };

  useEffect(() => {
    if (toggleLikePost.status === 'successful') {
      if (
        toggleLikePost.data.postLiked === true &&
        toggleLikePost.data.postId === post.postId &&
        Array.isArray(idsOfUsersWhoHaveLikedThePost)
      ) {
        let idsOfUsersWhoHaveLikedThePostTemp = [
          ...idsOfUsersWhoHaveLikedThePost,
        ];
        const filter = idsOfUsersWhoHaveLikedThePostTemp.filter(
          (item) => item.postId !== getMyProfile.data.userId
        );
        let idsOfUsersWhoHaveLikedThePostTemp2 = [
          ...filter,
          getMyProfile.data.userId,
        ];
        setIdsOfUsersWhoHaveLikedThePost(idsOfUsersWhoHaveLikedThePostTemp2);
        dispatch(resetToggleLikePost());
      } else if (
        toggleLikePost.data.postLiked === false &&
        toggleLikePost.data.postId === post.postId &&
        Array.isArray(idsOfUsersWhoHaveLikedThePost)
      ) {
        let idsOfUsersWhoHaveLikedThePostTemp = [
          ...idsOfUsersWhoHaveLikedThePost,
        ];

        const idsOfUsersWhoHaveLikedThePostTemp2 =
          idsOfUsersWhoHaveLikedThePostTemp.filter(
            (item) => item !== getMyProfile.data.userId
          );
        setIdsOfUsersWhoHaveLikedThePost(idsOfUsersWhoHaveLikedThePostTemp2);
        dispatch(resetToggleLikePost());
      }
    }
  }, [
    getMyProfile.data.userId,
    post.postId,
    toggleLikePost.data.postId,
    toggleLikePost.data.postLiked,
    toggleLikePost.status,
  ]);

  useEffect(() => {
    if (
      Array.isArray(idsOfUsersWhoHaveLikedThePost) &&
      idsOfUsersWhoHaveLikedThePost?.includes(getMyProfile.data.userId)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [getMyProfile.data.userId, idsOfUsersWhoHaveLikedThePost]);
  useEffect(() => {
    const idsOfUsersWhoHaveLikedThePostTemp = post.likedUsers.map(
      (item) => item.userId
    );
    setIdsOfUsersWhoHaveLikedThePost(idsOfUsersWhoHaveLikedThePostTemp);
  }, [post.likedUsers]);
  // console.log('idslikedusers', idsOfUsersWhoHaveLikedThePost);
  // console.log('getMyProfile.data.userId', getMyProfile.data.userId);
  // console.log('toggleLikePost', toggleLikePost);
  return (
    <div className='post-card shadow-sm mx-auto'>
      <div className='post-card-header'>
        <div className='post-owner-details'>
          <div
            className='img-circle'
            onClick={() => navigate(`other-users/${post?.userId}`)}
          >
            <img
              src={post?.userProfilePicture}
              alt='post-img'
              className={`${
                profileImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
              }`}
              onLoad={() => setProfileImgOnLoadStatus('success')}
              onError={() => setProfileImgOnLoadStatus('error')}
            />
            {profileImgOnLoadStatus === 'base' && <UserProfilePhotoLoader2 />}
            {profileImgOnLoadStatus === 'error' && (
              <div className='error-img'>couldn't load img</div>
            )}
          </div>
          <div>
            <div className='d-flex align-items-center'>
              <span
                className='name'
                onClick={() => navigate(`other-users/${post?.userId}`)}
              >
                {post?.firstName} {post?.secondName}
              </span>
              <span className='small-circle'></span>
              <span className='follow-btn'>
                {post?.following ? 'following' : 'follow'}
              </span>
            </div>
            <div className='job-role'>{post?.userProfession}</div>
            <div className='post-time'>{timeago}</div>
          </div>
        </div>

        <div>{post?.event && <div className='rsvp-btn'>RSVP</div>}</div>
      </div>

      <div className='post-content-wrapper'>
        <div className='post-content'>{post?.content}</div>
        {(post.postImageUrl || post.postVideoUrl) && (
          <>
            {post.postImageUrl ? (
              <div className='post-image'>
                <img
                  src={post?.postImageUrl}
                  alt='post-img'
                  className={`${
                    postImgOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                  }`}
                  onLoad={() => setPostImgOnLoadStatus('success')}
                  onError={() => setPostImgOnLoadStatus('error')}
                />
                {postImgOnLoadStatus === 'base' && <MediaLoader />}
                {postImgOnLoadStatus === 'error' && (
                  <div className='error-img'>couldn't load img</div>
                )}
              </div>
            ) : (
              <div className='post-video'>
                <video
                  controls
                  className={`${
                    postVideoOnLoadStatus === 'success' ? 'd-block' : 'd-none'
                  }`}
                  onLoadedMetadata={() => setPostVideoOnLoadStatus('success')}
                  onError={() => setPostVideoOnLoadStatus('error')}
                >
                  <source src={post?.postVideoUrl} type='video/mp4' />
                </video>
                {postVideoOnLoadStatus === 'base' && <MediaLoader />}
                {postVideoOnLoadStatus === 'error' && (
                  <div className='error-img'>couldn't load img</div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className='post-card-footer'>
        <div className='post-card-footer-content'>
          <div className='d-flex align-items-center c-gap-10'>
            <button
              onClick={handleLike}
              className={`heart-icon ${liked && 'active'}`}
            >
              <Icon icon='heart' />
            </button>
            <span>
              {Array.isArray(idsOfUsersWhoHaveLikedThePost) &&
                idsOfUsersWhoHaveLikedThePost?.length}
            </span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='comment' />
            </button>
            <span>5</span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='bookmark' />
            </button>
            <span>5</span>
          </div>

          <div className='d-flex align-items-center c-gap-10'>
            <button>
              <Icon icon='share' />
            </button>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
