import { useDraggable } from "@dnd-kit/core";
import { Button, Input } from "antd";
import { useState } from "react";
import { Positions } from "./ReactPdf";
import { MenuOutlined } from "@ant-design/icons";

interface DraggableTextProps {
  id: string;
  style?: React.CSSProperties;
  position?: { x: number; y: number };
}
export default function DraggableText({ id, style }: DraggableTextProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });

  const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};
  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...transformStyle }}
      {...listeners}
      {...attributes}
    >
      <span>
        <Input
          className="input-component"
          bordered
          style={{ width: "20%" }}
        ></Input>
      </span>
      <Button {...listeners} {...attributes}>
        <MenuOutlined />
      </Button>
    </div>
  );
}
