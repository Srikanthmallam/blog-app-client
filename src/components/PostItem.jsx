import React from "react";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";

const postItem = ({
  postId,
  category,
  title,
  thumbnail,
  description,
  authorId,
  createdAt,
}) => {
  const shortDescription =
    description.length > 145 ? description.substr(0, 145) + "..." : description;
  const potTitile = title.length > 30 ? title.substr(0, 30) + "..." : title;

  return (
    <article className="post">
      <div className="post-thumbnail">
        <Link to={`/posts/${postId}`}>
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
            alt=""
          />
        </Link>
      </div>
      <div className="post-content">
        <Link to={`/posts/${postId}`}>
          <h3>{potTitile}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post-footer">
          <PostAuthor id={authorId} createdAt={createdAt} />
          <Link
            to={`/posts/categories/${category}`}
            className="btn btn-category"
          >
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default postItem;
