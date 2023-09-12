import React, { useEffect, useState } from "react";
// import List from "./ToDoReact/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./ToDo/List";
import Firebase from "./Firebase";
import TodoStore from "./ToDo/ToDoStore";
import Signup from "./ToDo/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./ToDo/Login";
import { PrivateRoutes } from "./ToDo/PrivateRoutes";

const App: React.FC = () => {
  const [firebase, setFirebase] = useState<Firebase | null>(null);

  useEffect(() => {
    const fbInstance = new Firebase("todos");

    setFirebase(fbInstance);
  }, []);

  if (!firebase) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider firebase={firebase}>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<List firebase={firebase} />} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
