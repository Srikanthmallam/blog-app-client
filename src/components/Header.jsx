import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { currUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeNavHandler}>
          <img src={logo} alt="logo" />
        </Link>
        {currUser?.id && isNavShowing && (
          <ul className="nav-menu">
            <li>
              <Link to="/" onClick={closeNavHandler}>
                Home
              </Link>
            </li>
            <li>
              <Link to={`/profile/${currUser.id}`} onClick={closeNavHandler}>
                {currUser.name}
              </Link>
            </li>
            <li>
              <Link to="/createpost" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/Logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currUser?.id && isNavShowing && (
          <ul className="nav-menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav-toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <IoClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
