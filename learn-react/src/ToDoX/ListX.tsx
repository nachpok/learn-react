import React, { useState } from "react";
import store, { Item } from "./ToDoStore";
import ListItem from "./ListItem";
import { observer } from "mobx-react";
import Footer from "../ToDoReact/Footer";
export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}

function ListX() {
  const [mode, setMode] = useState<Mode>(Mode.all);
  const handleToggle = (itemId: number) => {
    store.toggleTodo(itemId);
  };
  const handleRemove = (item: Item) => {
    store.removeTodo(item);
  };

  const handleClear = () => {
    store.removeList();
  };
  const filterMode = (item: Item) => {
    return (
      mode === Mode.all ||
      (item.isDone && mode === Mode.completed) ||
      (!item.isDone && mode === Mode.active)
    );
  };
  const listComponents = store.todos
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

  if (store.isLoading) {
    return <div>Loading...</div>;
  }
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
        mode={mode}
        setMode={setMode}
        setList={handleClear}
      />
    </div>
  );
}

export default observer(ListX);
