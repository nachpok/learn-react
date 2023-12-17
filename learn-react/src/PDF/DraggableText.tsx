import { useDraggable } from "@dnd-kit/core";
import { Button, Input } from "antd";
import { useState } from "react";
import { Position } from "./ReactPdf";
import { MenuOutlined } from "@ant-design/icons";

interface DraggableTextProps {
  id: string;
  style?: React.CSSProperties;
  position: Position;
}
export default function DraggableText({
  id,
  style,
  position,
}: DraggableTextProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputLen, setInputLen] = useState(5);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputLen(inputValue.length > 5 ? inputValue.length : 5);
  };
  const lastPosition = position?.x
    ? { x: position.x, y: position.y }
    : { x: 0, y: 0 };
  const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x + lastPosition.x}px, ${
          transform.y + lastPosition.y
        }px, 0)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...transformStyle }}
      {...listeners}
      {...attributes}
      onMouseEnter={() => setInputFocused(true)}
      onMouseLeave={() => setInputFocused(false)}
    >
      <span>
        <Input
          className="input-component"
          bordered
          style={{
            width: `${inputLen}ch`,
            borderRadius: "0",
            height: "32px",
            backgroundColor: "transparent",
          }}
          onInput={handleInputChange}
        ></Input>
      </span>
      {isInputFocused ? (
        <Button
          {...listeners}
          {...attributes}
          style={{ padding: "0px 2px ", borderRadius: "0" }}
        >
          |
        </Button>
      ) : null}
    </div>
  );
}
