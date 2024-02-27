import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ id, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${id}`
        );
        setAuthor(response?.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [id]);

  return (
    <Link to={`/posts/users/${id}`} className="post-author">
      <div className="post-author-avatar">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt=""
        />
      </div>
      <div className="post-author-details">
        <h5>by: {author.name}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
