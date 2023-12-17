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
    >
      <span>
        <Input
          className="input-component"
          bordered
          style={{ width: "20%", borderRadius: "0", height: "32px" }}
        ></Input>
      </span>
      <Button
        {...listeners}
        {...attributes}
        style={{ padding: "0px 2px ", borderRadius: "0" }}
      >
        |
      </Button>
    </div>
  );
}
