import React from "react";
import loading from "../Assets/loading.gif";

const Loader = () => {
  return (
    <div className="loader ">
      <div className="loader-image center">
        <img src={loading} alt="" />
      </div>
    </div>
  );
};

export default Loader;
