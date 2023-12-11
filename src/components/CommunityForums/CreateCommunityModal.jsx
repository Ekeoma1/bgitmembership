import "../../../src/assets/scss/communityForums.scss";
import { useEffect, useState } from "react";
import { triggerCreateForum } from "../../Features/forums/forums_slice";
import { useDispatch, useSelector } from "react-redux";

const CreateCommunityModal = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    forumName: "",
    details: "",
    infoJson: "",
    visibility: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { createForum } = useSelector((state) => state.forums);

  useEffect(() => {
    createForum.status === "successful" && handleCancel();
  }, [createForum.status]);

  const clearFormData = () => {
    setFormData((prevData) => ({
      ...prevData,
      forumName: "",
      details: "",
      infoJson: "",
      visibility: "",
    }));
  };

  const handleCancel = () => {
    setErrors({});
    clearFormData();
  };

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
      const infoArray = formData.infoJson?.split(".").map((item) => item.trim());
      // Filter out empty strings from the array
      const filteredInfoArray = infoArray?.filter((item) => item !== "");
      if (filteredInfoArray?.length === 0) {
        newErrors.infoJson = "Info should not be empty";
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
      [name]: name === "infoJson" ? value : value.trim(),
    }));
  };

  return (
    <>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="alt-btn small-btn">
        Create Community
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">
                Create Community
              </h4>
              <button onClick={handleCancel} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form className="create-community-form">
                <div className="input-wrapper">
                  <label htmlFor="forumName">
                    Name <span>*</span>
                  </label>
                  <input value={formData.forumName} onChange={handleChange} type="text" id="forumName" name="forumName" />
                  {errors.forumName && <div className="error-message">{errors.forumName}</div>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="details">
                    About <span>*</span>
                  </label>
                  <textarea value={formData.details} onChange={handleChange} name="details" id="details"></textarea>
                  {errors.details && <div className="error-message">{errors.details}</div>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="infoJson">Info</label>
                  <textarea
                    placeholder="Rules about the group (seperate each rule with a dot)"
                    onChange={handleChange}
                    name="infoJson"
                    id="infoJson"
                    value={formData.infoJson}
                  ></textarea>
                  {errors.infoJson && <div className="error-message">{errors.infoJson}</div>}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="visibility">Community type</label>
                  <div className="radio-wrapper">
                    <input
                      id="visibility2"
                      onChange={radioInputChange}
                      checked={formData.visibility === "2"}
                      type="radio"
                      name="visibility"
                      value="2"
                    />
                    <label htmlFor="visibility2">
                      <span>Public</span> Anyone can view, post, and comment to this community{" "}
                    </label>
                  </div>

                  <div className="radio-wrapper">
                    <input
                      id="visibility1"
                      onChange={radioInputChange}
                      checked={formData.visibility === "1"}
                      type="radio"
                      name="visibility"
                      value="1"
                    />
                    <label htmlFor="visibility1">
                      <span>Private</span> Only approved users can view and submit to this community{" "}
                    </label>
                  </div>
                  {errors.visibility && <div className="error-message">{errors.visibility}</div>}
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button onClick={handleCancel} type="button" class="secondary-btn small-btn" data-bs-dismiss="modal">
                Close
              </button>
              <button disabled={createForum.status === "loading"} onClick={formSubmit} type="button" class="primary-btn small-btn">
                {createForum.status === "loading" ? "loading" : "Create Community"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCommunityModal;
