import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form, Input, InputRef } from "antd";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

enum Error {
  none = "",
  passwordsDontMatch = "Passwords do not match",
  passwordToShort = "Password must be at least 6 characters",
}
function Signup() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const passwordConfRef = useRef<InputRef>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<Error>(Error.none);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // const emailRegex = new RegExp(
  //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  // );
  // const passwordRegex = new RegExp(
  //   "^(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d\\W]).{8,16}$"
  // );

  const onFinish = async () => {
    if (
      passwordRef.current?.input?.value !==
      passwordConfRef.current?.input?.value
    ) {
      console.log(`${passwordRef.current?.input?.value} !==
      ${passwordConfRef.current?.input?.value}`);
      return setError(Error.passwordsDontMatch);
    }
    try {
      setError(Error.none);
      setLoading(true);
      await signup(
        emailRef.current?.input?.value,
        passwordRef.current?.input?.value
      );
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/weak-password") {
          setError(Error.passwordToShort);
        }
        console.log(`Firebase Error: ${e.code}`);
      } else {
        console.log(`Other Error: ${e}`);
      }
    }
    setLoading(false);
  };

  return (
    <Card>
      <h2>Sign Up</h2>

      <Form
        title="Sing Up"
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 400 }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Input type="email" placeholder="Email" ref={emailRef} required />
        </Form.Item>
        <Form.Item>
          <Input.Password
            status={error ? "error" : undefined}
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            status={error ? "error" : undefined}
            placeholder="Password Confirmation"
            ref={passwordConfRef}
            required
          />
        </Form.Item>

        {error ? (
          <Form.Item>
            <Alert description={error} type="error" />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <div>
        Already have an account?<Link to="/login">Log In</Link>
      </div>
    </Card>
  );
}

export default Signup;
