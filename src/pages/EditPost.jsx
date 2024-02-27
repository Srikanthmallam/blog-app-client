import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [error, setError] = useState("");

  const { id } = useParams();

  const { currUser } = useContext(UserContext);

  const token = currUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const PostCategories = [
    "uncategorized",
    "Agiculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Weather",
  ];

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.messsage);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form-error-msg">{error}</p>}
        <form action="" className="form create-post-form" onSubmit={editPost}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled></option>
            {PostCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <textarea
            rows={7}
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="file"
            onChange={(e) => setTitle(e.target.files[0])}
            accept="png, jpg ,jpeg"
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
