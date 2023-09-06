import React, { useEffect, useState } from "react";
// import List from "./ToDoReact/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListR from "./ToDoReact/List";
import ListX from "./ToDoX/ListX";
import Firebase from "./Firebase";
import TodoStore from "./ToDoX/ToDoStore";
import { LogType, Login } from "./ToDoX/Login";

const App: React.FC = () => {
  const [firebase, setFirebase] = useState<Firebase | null>(null);
  const [store, setStore] = useState<TodoStore | null>(null);

  useEffect(() => {
    const fbInstance = new Firebase("todos");
    const storeInstance = new TodoStore(fbInstance);

    setFirebase(fbInstance);
    setStore(storeInstance);
  }, []);

  if (!firebase || !store) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login firebase={firebase} type={LogType.login} />}
        />
        <Route path="todoMobX" element={<ListX store={store} />} />
        <Route path="todo" element={<ListR />} />
        <Route path="*" element={<h1>No Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
