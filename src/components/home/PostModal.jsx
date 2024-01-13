import '../../../src/assets/scss/postModalMobile.scss';
import { useEffect, useState } from 'react';
import { triggerCreateForum } from '../../Features/forums/forums_slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetShowPostModalMobile,
  setShowPostModalMobile,
} from '../../Features/other/other_slice';
import CreatePost from './CreatePost';
import { FaTimes } from 'react-icons/fa';

const PostModal = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    forumName: '',
    details: '',
    infoJson: '',
    visibility: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { createForum } = useSelector((state) => state.forums);

  useEffect(() => {
    createForum.status === 'successful' && handleCancel();
  }, [createForum.status]);

  const clearFormData = () => {
    setFormData((prevData) => ({
      ...prevData,
      forumName: '',
      details: '',
      infoJson: '',
      visibility: '',
    }));
  };

  const handleCancel = () => {
    setErrors({});
    clearFormData();
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (
      formData.details !== '' &&
      formData.forumName !== '' &&
      formData.infoJson !== '' &&
      formData.visibility !== ''
    ) {
      // Validate form fields
      const newErrors = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (!value.trim()) {
          newErrors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
        }
      });

      // Additional validation for the 'info' field
      if (!newErrors.infoJson) {
        const infoArray = formData.infoJson
          ?.split('.')
          .map((item) => item.trim());
        // Filter out empty strings from the array
        const filteredInfoArray = infoArray?.filter((item) => item !== '');
        if (filteredInfoArray?.length === 0) {
          newErrors.infoJson = 'Info should not be empty';
        } else {
          // Stringify the infoJson array before updating formData
          formData.infoJson = JSON.stringify(filteredInfoArray);
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // Clear errors and submit the form
        setErrors({});
        dispatch(triggerCreateForum(formData));
        // createForum.status === "successful" && clearFormData()
      }
    }
  };

  const radioInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      visibility: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'infoJson' ? value : value.trim(),
    }));
  };
  const { showPostModalMobile } = useSelector((state) => state.other);
  const [showModal, setShowModal] = useState(false);
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
