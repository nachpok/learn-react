import React from "react";
import { Button } from "antd";
import "./Sample.css";

interface DropButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isClicked: boolean;
}

const DropButton: React.FC<DropButtonProps> = ({
  onClick,
  children,
  isClicked,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      type="default"
      className={`custom-button ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default DropButton;
