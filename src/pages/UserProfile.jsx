import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

import { UserContext } from "../context/userContext";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");

  const { id } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmNewPassword, setNewConfirmNewPassword] = useState("");

  const [error, setError] = useState("");

  const [isAvatarTouched, setISAvatarTouched] = useState(false);

  const { currUser } = useContext(UserContext);

  const token = currUser?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const chanageAvatarHandler = async () => {
    setISAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response.data.updatedAvatar.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data.user;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("newConfirmPassword", newConfirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response.data.messsage);
    }
  };

  return (
    <section className="profile">
      <div className="container profile-container">
        <Link to={`/myposts/${id}`} className="btn">
          My Posts
        </Link>
        <div className="profilr-detais">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt="profile pic"
              />
            </div>
            <form className="avatar-form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png,jpg,jpeg"
              />
              <label htmlFor="avatar" onClick={() => setISAvatarTouched(true)}>
                <MdEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile-avatar-btn"
                onClick={chanageAvatarHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currUser.name}</h1>
        </div>

        <form className="form profile-form" onSubmit={updateUser}>
          {error && <p className="form-error-msg">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="current pasword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm new password"
            value={newConfirmNewPassword}
            onChange={(e) => setNewConfirmNewPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
