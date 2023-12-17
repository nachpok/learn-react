import React, { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import DraggableText from "./DraggableText";
import { Positions } from "./ReactPdf";
import { SmartPointerSensor } from "./SmartPointerSensor";
import { useSensor, useSensors } from "@dnd-kit/core";
import { de } from "@faker-js/faker";

function Test() {
  const sensors = useSensors(useSensor(SmartPointerSensor));
  const initialPositions: Positions = { 1: { x: 0, y: 0 } };
  const [positions, setPositions] = useState<Positions>(initialPositions);
  const positionsRef = useRef<Positions>(initialPositions);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const currentPosition = positionsRef.current[active.id];
    const newPosition = {
      x: currentPosition.x + delta.x,
      y: currentPosition.y + delta.y,
    };
    positionsRef.current[active.id] = newPosition;
    setPositions({
      [active.id]: newPosition,
    });
  };
  const handleInputValue = (id: string, value: string) => {
    // handle the value here
  };

  return (
    <>
      <div
        style={{ width: "1000px", height: "1000px", backgroundColor: "white" }}
      >
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <DraggableText
            id="1"
            style={{
              transform: positionsRef.current["1"]
                ? `translate(${positionsRef.current["1"].x}px, ${positionsRef.current["1"].y}px)`
                : undefined,
            }}
            position={positions["1"]}
            handleInputValue={handleInputValue}
          />
        </DndContext>
      </div>
    </>
  );
}

export default Test;
