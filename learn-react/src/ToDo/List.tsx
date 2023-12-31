import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import ListItem from "./ListItem";
import { observer } from "mobx-react";
import Footer from "./Footer";
import "./list.css";
import Header from "./Header";
import Store from "./store";
import { api_domain } from "./PScale";
export enum Mode {
  all = "all",
  active = "active",
  completed = "completed",
}
interface Props {}
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
export const List: React.FC<Props> = () => {
  const [mode, setMode] = useState<Mode>(Mode.all);
  const [store, setStore] = useState<Store | null>(null);
  const [input, setInput] = useState<string>("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const url = `${api_domain}/api/route`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const storeInstance = new Store(result);
        setStore(storeInstance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("List.Error.Response:", error);
      });
  }, []);

  if (!store) {
    return <></>;
  }

  const handleToggle = (todoId: string) => {
    store.toggleTodo(todoId, currentUser.accessToken);
  };
  const handleRemove = (todo: Todo) => {
    store.removeTodo(todo, currentUser.accessToken);
  };

  const handleClear = () => {
    store.removeList(currentUser.accessToken);
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
      store.addTodo(input, currentUser.uid, currentUser.accessToken);
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
