import React, { useEffect, useState } from "react";
import "../assets/scss/user.scss";
import Post from "../components/User/Post";
import UserCard from "../components/User/UserCard";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/Molecules/SearchBox";
import MainButton from "../components/Molecules/MainButton";

const User = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // console.log('search', searchValue);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dispatchSearch, setDispatchLogSearch] = useState(false);
  useEffect(() => {
    if (dispatchSearch) {
      handleSearch();
    }
    handleSearch();
  }, [dispatchSearch, searchValue]);
  return (
    <div className="user-main-wrapper">
      <div className="container">
        <div className="search-box-section mx-auto">
          <div className="search-box-component-wrapper">
            <SearchBox
              onChange={onChange}
              value={searchValue}
              placeholder="Search posts"
              enterKeyPressed={() => setDispatchLogSearch(true)}
              otherKeysPressed={() => setDispatchLogSearch(false)}
            />
          </div>
          <div className="btn">
            <MainButton onClick={handleSearch} size={"small"} text={"search"} />
          </div>
        </div>
        <div className="content-wrapper mt-lg-5">
          <div className="d-lg-block user-card-con">
            <HiOutlineArrowLeft className="back" onClick={() => navigate("/")} />
            <UserCard />
          </div>
          <div className="post-con">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
