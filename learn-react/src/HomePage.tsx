import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Multi-App Home Page</h1>
      <ButtonLink to="/todo" label="Todo App" appId="todo" />
      <ButtonLink to="/pdf-editor" label="PDF Editor" appId="pdf-editor" />
    </div>
  );
};

// Custom ButtonLink component that wraps a Link in a Button
const ButtonLink: React.FC<{ to: string; label: string; appId: string }> = ({
  to,
  label,
  appId,
}) => {
  return (
    <Button>
      <Link to={to}>{label}</Link>
    </Button>
  );
};

export default HomePage;
