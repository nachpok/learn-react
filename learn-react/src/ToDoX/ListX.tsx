import React, { useEffect, useState } from "react";
import { Item, TodoList } from "./store";
import ListItem from "./ListItem";
import { observer } from "mobx-react";
import Footer from "../ToDoReact/Footer";
export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}
const store = new TodoList();

function ListX() {
  const [mode, setMode] = useState<Mode>(Mode.all);
  // TODO why is it not rerendring and I need to use a useState to trigger??
  const [parentState, setParentState] = useState<number>(0);
  const handleToggle = (itemId: number) => {
    store.toggleTodo(itemId);
    setParentState(Date.now());
  };
  const handleRemove = (item: Item) => {
    store.removeTodo(item);
    setParentState(Date.now());
  };
  const handleClear = () => {
    store.removeList();
    setParentState(Date.now());
  };
  const filterMode = (item: Item) => {
    return (
      mode === Mode.all ||
      (item.isDone && mode === Mode.completed) ||
      (!item.isDone && mode === Mode.active)
    );
  };
  const listComponents = store.list
    .filter((item) => filterMode(item))
    .map((item) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          toggle={handleToggle}
          remove={handleRemove}
        />
      );
    });

  const [input, setInput] = useState<string>("");
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      store.addTodo(input);
      setInput("");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div
      className="listComponent"
      style={{ textAlign: "center", width: "350px" }}
    >
      <div className="listContainer ">
        <h1>ToDoX</h1>
        <input
          placeholder="What needs to be done?"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        {listComponents}
      </div>
      <Footer
        listLen={store.list.filter((item) => !item.isDone).length}
        setMode={setMode}
        setList={handleClear}
      />
    </div>
  );
}

export default observer(ListX);
