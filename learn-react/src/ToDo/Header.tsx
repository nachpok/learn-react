import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser, logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (e) {}
  };
  return (
    <>
      {currentUser ? (
        <div>
          <strong>Email:</strong> {currentUser.email}{" "}
          <Button type="primary" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
