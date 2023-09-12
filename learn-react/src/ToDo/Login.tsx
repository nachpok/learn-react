import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form, Input, InputRef } from "antd";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
enum Error {
  none = "",
  wrongPassword = "Password does not match email",
  default = "Failed to sign in",
}
export default function Login() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const { login } = useAuth();
  const [error, setError] = useState<Error>(Error.none);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setError(Error.none);
      setLoading(true);
      await login(
        emailRef.current?.input?.value,
        passwordRef.current?.input?.value
      );
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (
          e.code === "auth/wrong-password" ||
          e.code === "auth/user-not-found"
        ) {
          setError(Error.wrongPassword);
        }
        console.log(`Firebase Error: ${e.code}`);
      } else {
        setError(Error.default);
        console.log(`Other Error: ${e}`);
      }
    }
    setLoading(false);
  };

  return (
    <Card>
      <h2>Log In</h2>

      <Form
        title="Sing Up"
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 500 }}
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
        {error ? (
          <Form.Item>
            <Alert description={error} type="error" />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
      <div>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Card>
  );
}
