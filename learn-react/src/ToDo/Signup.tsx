import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form, Input, InputRef } from "antd";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

enum Error {
  error = "error",
  none = "",
}
function Signup() {
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const passwordConfRef = useRef<InputRef>(null);
  const { signup } = useAuth();
  const [status, setStatus] = useState<Error>(Error.none);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async () => {
    if (
      passwordRef.current?.input?.value !==
      passwordConfRef.current?.input?.value
    ) {
      console.log(`${passwordRef.current?.input?.value} !==
      ${passwordConfRef.current?.input?.value}`);
      return setStatus(Error.error);
    }
    try {
      setStatus(Error.none);
      setLoading(true);
      await signup(
        emailRef.current?.input?.value,
        passwordRef.current?.input?.value
      );
    } catch (e) {
      //Todo handle error
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
            status={status}
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            status={status}
            placeholder="Password Confirmation"
            ref={passwordConfRef}
            required
          />
        </Form.Item>

        {status ? (
          <Form.Item>
            <Alert description="Passwords do not match" type="error" />
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
