import React, { useRef } from "react";
import "../../assets/scss/molecules.scss";
import Icon from "../Icon";

const SearchBox = ({ onChange, value, placeholder, enterKeyPressed, otherKeysPressed }) => {
  const inputContainer = useRef(null);

  return (
    <div className="search-box-component">
      <input type="text" placeholder={placeholder} onChange={onChange} value={value} ref={inputContainer} />
      <Icon icon="searchIcon" />
    </div>
  );
};

export default SearchBox;
