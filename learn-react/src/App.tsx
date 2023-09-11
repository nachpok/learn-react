import React, { useEffect, useState } from "react";
// import List from "./ToDoReact/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./ToDo/List";
import Firebase from "./Firebase";
import TodoStore from "./ToDo/ToDoStore";
import Signup from "./ToDo/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./ToDo/Login";

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
      <AuthProvider firebase={firebase}>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<List store={store} />} />
          <Route path="*" element={<h1>No Page</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
