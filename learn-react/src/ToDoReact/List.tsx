import React, { useState } from "react";
import "./list.css";
import Footer from "./Footer";
import ListItem from "./ListItem";
export interface Item {
  id: number;
  value: string;
  checked: boolean;
}

export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}

function ListR() {
  const [list, setList] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [listId, setListId] = useState<number>(0);
  const [mode, setMode] = useState<Mode>(Mode.all);

  const filterMode = (item: Item) => {
    return (
      mode === Mode.all ||
      (item.checked && mode === Mode.completed) ||
      (!item.checked && mode === Mode.active)
    );
  };

  const listComponents = list
    .filter((item) => filterMode(item))
    .sort((a, b) => a.id - b.id)
    .map((item) => {
      const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        item.checked = event.target.checked;
        setList([...list.filter((listItem) => listItem.id !== item.id), item]);
      };
      const handleRemove = () => {
        setList([...list.filter((listItem) => listItem.id !== item.id)]);
      };
      return (
        <ListItem
          item={item}
          handleChecked={handleChecked}
          handleRemove={handleRemove}
        />
      );
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      const item = { id: listId, value: input, checked: false };
      setList([...list, item]);
      setInput("");
      setListId(listId + 1);
    }
  };

  return (
    <div
      className="listComponent"
      style={{ textAlign: "center", width: "350px" }}
    >
      <div className="listContainer ">
        <h1>ToDo</h1>
        <input
          placeholder="What needs to be done?"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        {listComponents}
      </div>
      <Footer listLen={list.length} setMode={setMode} setList={setList} />
    </div>
  );
}

export default ListR;
