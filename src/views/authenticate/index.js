import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";

// components
import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";

import "./authenticate.css";

const Authenticate = (props) => {

  const [login, setLogin] = useState(true);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };

  const loginSuccess = (data) => {
    props.loginSuccess(data);
    setRedirectToReferrer(true);
  };

  const changeLoginMode = () => {
    setLogin(!login);
  };

  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <div className="auth-container">
      {login ? (
        <SignIn changeMode={changeLoginMode} success={loginSuccess} />
      ) : (
          <SignUp changeMode={changeLoginMode} success={loginSuccess} />
        )}
    </div>
  );
};

export default withRouter(Authenticate);
