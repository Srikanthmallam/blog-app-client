import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { currUser } = useContext(UserContext);

  const loacation = useLocation();

  const token = currUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (loacation.pathname === `/myposts/${currUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link className="btn btn-sm btn-danger" onClick={() => removePost(id)}>
      Delete
    </Link>
  );
};

export default DeletePost;
