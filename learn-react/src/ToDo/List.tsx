import React, { useEffect, useState } from "react";
import TodoStore, { Item } from "./ToDoStore";
import { useAuth } from "../Context/AuthContext";
import ListItem from "./ListItem";
import { observer } from "mobx-react";
import Footer from "./Footer";
import "./list.css";
import Header from "./Header";
import Firebase from "./Firebase";
export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}
interface Props {
  firebase: Firebase;
}

export const List: React.FC<Props> = ({ firebase }) => {
  const [mode, setMode] = useState<Mode>(Mode.all);
  const [store, setStore] = useState<TodoStore | null>(null);
  const [input, setInput] = useState<string>("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const storeInstance = new TodoStore(firebase);
    setStore(storeInstance);
  }, []);

  if (!store) {
    return <></>;
  }

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      store.addTodo(input, currentUser.uid);
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
    <>
      <Header />
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
    </>
  );
};

export default observer(List);
