import { useEffect, useState } from "react";
import "../../src/assets/scss/communityForums.scss";
import Banner from "../components/CommunityForums/Banner";
import Communities from "../components/CommunityForums/Communities.jsx";
import SuggestedForums from "../components/CommunityForums/SuggestedForums";
import CreateCommunityModal from "../components/CommunityForums/CreateCommunityModal.jsx";

const CommunityForumns = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-forums-wrapper bg-color22">
      <Banner />
      <Communities showModal={setShow} />
      <SuggestedForums />
      <CreateCommunityModal show={show} showModal={setShow} />
    </div>
  );
};

export default CommunityForumns;
