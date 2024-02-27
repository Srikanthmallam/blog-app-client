import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { setCurrUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrUser(null);
    navigate("/login");
  }, [setCurrUser, navigate]);

  return <></>;
};

export default LogoutPage;
