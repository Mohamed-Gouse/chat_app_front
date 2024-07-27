import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../app/authSlice";

function Navbar() {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <div className="">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            Navbar
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/chat"}
                  aria-current="page"
                >
                  Chat
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
            </ul>
            <div className="">
              {isLogged ? (
                <button onClick={() => dispatch(logout())} className="btn">
                  Logout
                </button>
              ) : (
                <Link to={"/Signin"} className="text-decoration-none text-dark">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
