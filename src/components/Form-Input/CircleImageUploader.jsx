import React from "react";
import { useField, useFormikContext } from "formik";

const CircleImageUploader = ({ name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const image = field.value;

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(name, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="circle-container">
      {image ? <img src={image} alt="Uploaded" className="uploaded-image" /> : <div className="placeholder-text">Add a photo</div>}
      <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
    </div>
  );
};

export default CircleImageUploader;
