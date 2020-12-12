import React, { useState } from "react";
import "./authenticate.css";
import { withRouter, Redirect } from "react-router-dom";

import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";

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
