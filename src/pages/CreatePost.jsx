import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [error, setError] = useState("");

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

  const { currUser } = useContext(UserContext);

  const token = currUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.messsage);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form-error-msg">{error}</p>}
        <form action="" className="form create-post-form" onSubmit={createPost}>
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
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg ,jpeg"
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
