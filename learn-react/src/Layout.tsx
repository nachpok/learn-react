import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <Link to="/todo">ToDo React</Link> |{" "}
        <Link to="/todoMobX">ToDo MobX</Link> | <Link to="/blog">Blog</Link>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
