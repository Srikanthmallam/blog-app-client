import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import Delete from "../pages/DeletePost";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail-container">
          <div className="post-detail-header">
            <PostAuthor id={post.creator} createdAt={post.createdAt} />
            {currUser?.id === post?.creator && (
              <div className="post-detail-btns">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <Delete id={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail-thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt=""
            />
          </div>
          <p>{post.description}</p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
