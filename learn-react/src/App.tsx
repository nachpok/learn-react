import React, { useEffect, useState } from "react";
// import List from "./ToDoReact/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./ToDo/List";
import Signup from "./ToDo/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./ToDo/Login";
import { PrivateRoutes } from "./ToDo/PrivateRoutes";
import ResetPassword from "./ToDo/ResetPassword";
import Firebase from "./ToDo/Firebase";

const App: React.FC = () => {
  const [firebase, setFirebase] = useState<Firebase | null>(null);

  useEffect(() => {
    const fbInstance = new Firebase();

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
          <Route path="reset-password" element={<ResetPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<List />} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
