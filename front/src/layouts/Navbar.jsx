import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <div className="d-flex justify-content-between">
      <img src="/"/>
      <div className="d-flex">
        <Link to="projects" >Projects</Link>
        <Link to="encadrants" >Encadrant</Link>
      </div>
      <div>
        <h6>{user.username}</h6>
      </div>
    </div>
  );
}
