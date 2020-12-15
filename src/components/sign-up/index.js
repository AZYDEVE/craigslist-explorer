import React, { useState } from "react";
import { signUpUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

const Register = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);

  const handleClick = () => {
    if (password === "" || email === "") {
      setError("Please fill in all fields");
      return;
    }

    // TODO: validate values
    var payload = {
      email: email,
      password: password,
    };

    signUpUser(payload)
      .then((response) => {
        if (response.status === 200) {
          props.success(response.data);
        } else if (response.status === 202) {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePassword = (pass) => setPassword(sha256(pass).toString());

  return (
    <div className="container">
      <div onClick={props.changeMode} className="top-right-corner">
        Sign-in
      </div>
      <h1>Sign-up</h1>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          alt="email"
          name="username"
          placeholder="Enter your Email"
          type="text"
          minLength='3'
          required
          onChange={(event) => setEmail(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          alt="password"
          name="password"
          placeholder="Enter your Password"
          type="password"
          minLength='4'
          required
          onChange={(event) => handlePassword(event.target.value)}
        ></input>
      </div>

      <button aria-label="Sign up to forum" onClick={handleClick}>
        Sign-up
      </button>

      <div className="error">{error ? error : ""}</div>
    </div>
  );
};

export default Register;
