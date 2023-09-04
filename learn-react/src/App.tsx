import React from "react";
// import List from "./ToDoReact/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Blog from "./Blog/Blog";
import ListR from "./ToDoReact/List";
import ListX from "./ToDoX/ListX";
import Signup from "./Auth/Signup";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="todo" element={<ListR />} />
          <Route path="todoMobX" element={<ListX />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<h1>No Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
