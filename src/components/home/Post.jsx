import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "../Molecules/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { triggerGetAllPosts } from "../../Features/posts/posts_slice";
import PostsLoader from "../Atoms/skeleton-loaders/home-page/PostsLoader";
import MainButton from "../Molecules/MainButton";

const Post = () => {
  const dispatch = useDispatch();
  const { getAllPosts, createPost } = useSelector((state) => state.posts);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const handleLoadMore = () => {
    setPageNumber((prevState) => prevState + 1);
  };
  useEffect(() => {
    if (createPost.status === "successful") {
      const post = createPost?.data;
      console.log("psst", post);
      setGetAllPostsLocal([post, ...getAllPostsLocal]);
    }
  }, [createPost.status]);

  useEffect(() => {
    const data = { queryParams: { pageNumber, pageSize } };
    dispatch(triggerGetAllPosts(data));
  }, [pageNumber]);

  const [getAllPostsLocal, setGetAllPostsLocal] = useState([]);

  useEffect(() => {
    if (getAllPosts?.status === "successful" && getAllPosts.data?.posts) {
      const temp = getAllPosts?.data?.posts;
      const getAllPostsPrevious = [...getAllPostsLocal];
      const getAllPostsAllTemp = [...getAllPostsPrevious, ...temp];
      const getAllPostsAll = getAllPostsAllTemp.filter((obj, index, array) => {
        return array.findIndex((item) => item.postId === obj.postId) === index;
      });
      setGetAllPostsLocal(getAllPostsAll);
    }
  }, [getAllPosts.data?.posts, getAllPosts?.status, getAllPostsLocal]);

  return (
    <div className="post-wrapper">
      <div className="d-lg-block d-none">
        <CreatePost />
      </div>
      <div className="post-card-wrapper">
        {(getAllPosts.status === "base" || getAllPosts.status === "loading") && pageNumber === 1 ? (
          <PostsLoader />
        ) : getAllPosts.status === "successful" || pageNumber >= 1 ? (
          <>
            {getAllPosts.data ? (
              <>
                {getAllPostsLocal.length === 0 ? (
                  <>
                    <div className="empty-state">
                      <p>No posts to show...</p>
                    </div>
                  </>
                ) : (
                  <>
                    {getAllPostsLocal?.map((post, key) => {
                      return <PostCard key={key} post={post} getAllPostsLocal={getAllPostsLocal} setGetAllPostsLocal={setGetAllPostsLocal} />;
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="internet-error-state">
                  <p> Check your internet and try again...</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="server-error-state">Something went wrong</div>
          </>
        )}
        {pageNumber < 10 && (
          <div className="btn-con">
            <MainButton
              text={"Load more"}
              onClick={() => {
                handleLoadMore();
              }}
              width={"25rem"}
              size={"small"}
              loading={getAllPosts.status === "loading"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
