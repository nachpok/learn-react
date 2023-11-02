import React from "react";

interface DropTextProps {
  style?: React.CSSProperties;
  // other props...
}

const DropText: React.FC<DropTextProps> = ({ style, ...otherProps }) => {
  // your component logic...
  return <div style={style}>Text Component</div>;
};
export default DropText;
