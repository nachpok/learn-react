import React, { useState } from "react";
import { Button } from "antd";
import "./Sample.css";

interface DropButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const DropButton: React.FC<DropButtonProps> = ({ onClick, children }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    onClick();
    setIsClicked((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Button
        type="default"
        className={`custom-button ${isClicked ? "clicked" : ""}`}
        onClick={handleClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default DropButton;
