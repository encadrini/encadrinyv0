import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../layouts/Navbar";

export default function Main({ user }) {
  return (
    <div>
     <Navbar user={user} />
      <Outlet />
    </div>
  );
}
