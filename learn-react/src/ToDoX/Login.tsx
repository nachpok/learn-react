import React, { useEffect, useState } from "react";
import Firebase from "../Firebase";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
export enum LogType {
  login = "login",
  signin = "signin",
}
interface Props {
  firebase: Firebase;
  type: LogType;
}

export const Login: React.FC<Props> = ({ firebase, type }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(firebase.auth);

  useEffect(() => {
    if (loading) {
      //TODO loading screen
      return;
    }
    if (user) navigate("/todoMobX");
  }, [user, loading]);

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
    type === LogType.login
      ? firebase.signInWithEmail(email, password)
      : firebase.signUpWithEmail(email, password);
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
          {type === LogType.login ? "Log In" : "Sign UP"}
        </button>
      </div>
    </form>
  );
};
