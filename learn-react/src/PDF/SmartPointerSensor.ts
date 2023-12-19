import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";

export class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as any,
      handler: ({ nativeEvent: event }: PointerEvent) => {
        // getElementTest(event.target as Element); //for identifying elements to restrict form DnD
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target as Element)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element: Element | null) {
  const interactiveElementType = ["svg"];
  const interactiveClasses = ["input-component", "test-class"];

  if (
    (element?.tagName &&
      interactiveElementType.includes(element.tagName.toLowerCase())) ||
    //in hour timepicker the OK button has no class so I include the parent classes
    (element?.parentElement?.tagName &&
      interactiveElementType.includes(
        element.parentElement?.tagName?.toLowerCase()
      )) ||
    (element?.className &&
      interactiveClasses.some((interactiveClass) =>
        element.className.includes(interactiveClass)
      ))
  ) {
    return true;
  }

  return false;
}

function getElementTest(element: Element | null) {
  if (element) {
    console.log(" element: ", element);
  }
}
