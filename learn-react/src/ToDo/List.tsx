import React, { useEffect, useState } from "react";
import TodoStore, { Item } from "./ToDoStore";
import { useAuth } from "../Context/AuthContext";
import ListItem from "./ListItem";
import { observer } from "mobx-react";
import Footer from "./Footer";
import "./list.css";
import Header from "./Header";
import Firebase from "./Firebase";
import Store from "./store";
import { api_domain } from "./PScale";
export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}
interface Props {
  firebase: Firebase;
}
export interface PSUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  todos: Todo[];
}
export interface Todo {
  id: string;
  userId: string;
  title: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
}
export const List: React.FC<Props> = ({ firebase }) => {
  const [mode, setMode] = useState<Mode>(Mode.all);
  // const [store, setStore] = useState<TodoStore | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [input, setInput] = useState<string>("");
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("VERCEL_URL: ", api_domain);
    fetch(
      `https://todo-api-juzg.vercel.app/api/todos/${currentUser.uid}/user/${currentUser.email}/getUser`
    )
      .then((response) => response.json())
      .then((result) => {
        const storeInstance = new Store(result);
        console.log("List.result: ", result);
        setStore(storeInstance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!store) {
    return <></>;
  }

  const handleToggle = (itemId: string) => {
    store.toggleTodo(itemId);
  };
  const handleRemove = (item: Todo) => {
    store.removeTodo(item);
  };

  const handleClear = () => {
    store.removeList();
  };
  const filterMode = (item: Todo) => {
    return (
      mode === Mode.all ||
      (item.is_complete && mode === Mode.completed) ||
      (!item.is_complete && mode === Mode.active)
    );
  };
  const listComponents = store.todos
    .filter((item) => filterMode(item))
    .map((item) => {
      return (
        <ListItem
          key={item.id}
          todo={item}
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
          listLen={store.list.filter((item) => !item.is_complete).length}
          mode={mode}
          setMode={setMode}
          setList={handleClear}
        />
      </div>
    </>
  );
};

export default observer(List);
