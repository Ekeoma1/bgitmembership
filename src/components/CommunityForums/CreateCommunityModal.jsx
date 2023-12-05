import "../../../src/assets/scss/communityForums.scss";
import { useState } from "react";
import { triggerCreateForum } from "../../Features/forums/forums_slice";
import { useDispatch } from "react-redux";

const CreateCommunityModal = ({ show, showModal }) => {
  const dispatch = useDispatch();
  const initialFormData = {
    forumName: "",
    details: "",
    infoJson: "",
    visibility: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  const formSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Additional validation for the 'info' field
    if (!newErrors.infoJson) {
      const infoArray = formData.infoJson.split(".").map((item) => item.trim());
      // Filter out empty strings from the array
      const filteredInfoArray = infoArray.filter((item) => item !== "");
      if (filteredInfoArray.length === 0) {
        newErrors.infoJson = "Info should not be empty";
      } else {
        formData.infoJson = filteredInfoArray; // Update formData with the array
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Clear errors and submit the form
      setErrors({});
      // Perform your form submission logic here
      // console.log("Form submitted:", formData);
      dispatch(triggerCreateForum(formData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "infoJson" ? value : value.trim(), // Trim leading and trailing spaces for other fields
    }));
  };

  const handleCancel = () => {
    // Clear errors and reset the form fields
    setErrors({});
    setFormData(initialFormData);
    // Close the modal
    showModal(false);
  };

  return (
    <div className={`create-community-modal-wrapper ${!show && "d-none"}`}>
      <div className="create-community-modal">
        <h4>Create a Community</h4>

        <form onSubmit={formSubmit} className="create-community-form">
          <div className="input-wrapper">
            <label htmlFor="forumName">
              Name <span>*</span>
            </label>
            <input onChange={handleChange} type="text" id="forumName" name="forumName" />
            {errors.forumName && <div className="error-message">{errors.forumName}</div>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="details">
              About <span>*</span>
            </label>
            <textarea onChange={handleChange} name="details" id="details"></textarea>
            {errors.details && <div className="error-message">{errors.details}</div>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="infoJson">Info</label>
            <textarea onChange={handleChange} name="infoJson" id="infoJson"></textarea>
            {errors.infoJson && <div className="error-message">{errors.infoJson}</div>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="visibility">Community type</label>
            <div className="radio-wrapper">
              <input onChange={handleChange} type="radio" name="visibility" value="2" />
              <label htmlFor="">
                <span>Public</span> Anyone can view, post, and comment to this community{" "}
              </label>
            </div>

            <div className="radio-wrapper">
              <input onChange={handleChange} type="radio" name="visibility" value="1" />
              <label htmlFor="">
                <span>Private</span> Only approved users can view and submit to this community{" "}
              </label>
            </div>
            {errors.visibility && <div className="error-message">{errors.visibility}</div>}
          </div>

          <div className="d-flex justify-content-end gap-4">
            <button className="secondary-btn small-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="primary-btn small-btn">
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
