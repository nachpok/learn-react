import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const HomePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const handleLogOut = async () => {
    try {
      await logout();
    } catch (e) {}
  };
  return (
    <div>
      <h1>Welcome {currentUser.email}</h1>
      <Button type="primary" onClick={handleLogOut}>
        Log out
      </Button>
      <ButtonLink to="/todo" label="Todo App" />
      <ButtonLink to="/pdf-editor" label="PDF Editor" />
    </div>
  );
};

const ButtonLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <Button>
      <Link to={to}>{label}</Link>
    </Button>
  );
};

export default HomePage;
