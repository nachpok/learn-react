import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const passwordRegex = new RegExp(
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d\\W]).{8,16}$"
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    emailRegex.test(email) ? setValidEmail(true) : setValidEmail(false);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    passwordRegex.test(password)
      ? setValidPassword(true)
      : setValidPassword(false);
  };

  const handleSubmit = () => {
    console.log(`email: ${email}, password: ${password}`);
  };
  return (
    <form>
      <h1>Signup</h1>
      <div>
        <span>email</span>
        <input
          id="email"
          className={emailRegex.test(email) ? "validInput" : "nonValidInput"}
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <span>password</span>
        <input
          id="password"
          className={
            passwordRegex.test(password) ? "validInput" : "nonValidInput"
          }
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button disabled={!validPassword && !validEmail} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default Signup;
