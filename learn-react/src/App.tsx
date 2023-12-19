import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import List from "./ToDo/List";
import Signup from "./ToDo/Signup";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./ToDo/Login";
import { PrivateRoutes } from "./ToDo/PrivateRoutes";
import ResetPassword from "./ToDo/ResetPassword";
import Firebase from "./ToDo/Firebase";
import HomePage from "./HomePage";
import ReactPdf from "./PDF/ReactPdf";
import Test from "./PDF/Test";

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
            <Route path="/" element={<HomePage />} />
            <Route path="todo" element={<List />} />
            <Route path="pdf-editor" element={<ReactPdf />} />
            {/* <Route path="test" element={<Test />} /> */}
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
