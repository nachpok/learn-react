import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const homePage = () => {
    navigate(`/`);
  };
  return (
    <>
      {currentUser ? (
        <div>
          <Button type="primary" onClick={homePage}>
            Home Page
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
