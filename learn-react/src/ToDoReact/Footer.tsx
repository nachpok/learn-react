import React from "react";
import { Mode } from "./List";

export interface FooterProps {
  listLen: number;
  setMode: (mode: Mode) => void;
  setList: ([]) => void;
}
function Footer({ listLen, setMode, setList }: FooterProps) {
  const counterText =
    listLen === 1 ? (
      <span>1 item left</span>
    ) : (
      <span>{listLen} items left</span>
    );
  function handleMode(mode: Mode): void {
    setMode(mode);
  }
  function handleClear(): void {
    setList([]);
  }

  return (
    <div className="footer">
      <span>{counterText} </span>
      {"  "}
      <button onClick={() => handleMode(Mode.all)}>All</button>
      <button onClick={() => handleMode(Mode.active)}>Active</button>
      <button onClick={() => handleMode(Mode.completed)}>Completed</button>
      <button onClick={() => handleClear()}>Clear list</button>
    </div>
  );
}

export default Footer;
