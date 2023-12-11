import { useEffect, useState } from "react";
import "../../src/assets/scss/communityForums.scss";
import Banner from "../components/CommunityForums/Banner";
import Communities from "../components/CommunityForums/Communities.jsx";
import SuggestedForums from "../components/CommunityForums/SuggestedForums";
// import CreateCommunityModal from "../components/CommunityForums/CreateCommunityModal.jsx";

const CommunityForumns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-forums-wrapper bg-color22">
      <Banner />
      <Communities />
      <SuggestedForums />
      {/* <CreateCommunityModal/> */}
    </div>
  );
};

export default CommunityForumns;
