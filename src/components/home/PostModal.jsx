import '../../../src/assets/scss/postModalMobile.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetShowPostModalMobile,
} from '../../Features/other/other_slice';
import CreatePost from './CreatePost';
import { FaTimes } from 'react-icons/fa';

const PostModal = () => {
  const dispatch = useDispatch();
  const { showPostModalMobile } = useSelector((state) => state.other);

  return (
    <>
      <div
        id='myModal'
        class={`post-modal-mobile ${showPostModalMobile && 'show-mobile'}`}
      >
        <div class='modal-content'>
          <span
            onClick={() => dispatch(resetShowPostModalMobile())}
            class='close'
          >
            <FaTimes />
          </span>
          <CreatePost />
        </div>
      </div>
    </>
  );
};

export default PostModal;
