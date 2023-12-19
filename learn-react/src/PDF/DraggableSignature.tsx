import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Position } from "./ReactPdf";
import Test from "./Test";
interface DraggableSignatureProps {
  id: string;
  style?: React.CSSProperties;
  position: Position;
  svg: string;
  removeSignature: (id: string) => void;
}
//Todo - remove option
function DraggableSignature({
  id,
  style,
  position,
  svg,
  removeSignature,
}: DraggableSignatureProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });
  const [isHovered, setIsHovered] = useState(false);

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
  const alignButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styledSVG = svg.replace(
    "<svg ",
    '<svg style="width:200px;height:100px;" '
  );
  return (
    <div
      className="svg-container"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, ...transformStyle, ...alignButtonStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div dangerouslySetInnerHTML={{ __html: styledSVG }} />
      {isHovered && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button>Drag Signature</button>
          <button className="test-class" onClick={() => removeSignature(id)}>
            Clear Signature
          </button>
        </div>
      )}
    </div>
  );
}

export default DraggableSignature;
