import { Input } from "antd";
import React from "react";
interface TextInputProps {
  style?: React.CSSProperties;
  draggable?: boolean;
  onDrag?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}
const TextInput: React.FC<TextInputProps> = ({ style, ...otherProps }) => {
  return <input style={style} {...otherProps} />;
};
export default TextInput;
