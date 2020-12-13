import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Header = (props) => {
  return (
    <header role="banner" className="active" id="scroll-header">
      <nav role="navigation" className="menu">
        <Link aria-label="Craigslist" to="/">
          Craigslist
        </Link>
        <Link aria-label="Navigate to Home page" to="/">
          Home
        </Link>
      </nav>
      <div className="login">
        {props.user ? (
          <div>
            <div className="user">Hello {props.user.email}</div>
            <button onClick={props.logout} aria-label="Logout button">
              Logout
            </button>
          </div>
        ) : (
            <Link
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            >
              Sign-In/Sign-up
            </Link>
          )}
      </div>
    </header>
  );
};

export default withRouter(Header);
