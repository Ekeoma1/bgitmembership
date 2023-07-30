import { useState } from "react";
import Icon from "../Icon";

const CreatePost = () => {
  const [postContent, setPostContent] = useState("Heyy, I’ve just joined. Excited to meet you allll! 🥳💜");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postContent);
  };
  return (
    <div className="create-post-card shadow-sm mx-auto d-lg-block d-none">
      <h2>Create a Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <Icon icon="photo" />

            <Icon icon="video" />
          </div>
          <button type="submit" className="primary-btn small-btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
