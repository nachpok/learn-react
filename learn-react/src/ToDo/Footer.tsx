import React from "react";
import { Mode } from "./List";

export interface FooterProps {
  listLen: number;
  mode: Mode;
  setMode: (mode: Mode) => void;
  setList: ([]) => void;
}
function Footer({ listLen, mode, setMode, setList }: FooterProps) {
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
      <button
        onClick={() => handleMode(Mode.all)}
        className={mode === Mode.all ? "selected" : "unselected"}
      >
        All
      </button>
      <button
        onClick={() => handleMode(Mode.active)}
        className={mode === Mode.active ? "selected" : "unselected"}
      >
        Active
      </button>
      <button
        onClick={() => handleMode(Mode.completed)}
        className={mode === Mode.completed ? "selected" : "unselected"}
      >
        Completed
      </button>
      <button onClick={() => handleClear()}>Clear list</button>
    </div>
  );
}

export default Footer;
