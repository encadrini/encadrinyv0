import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../apps/Main";
import Auth from "../apps/Auth";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
function Router() {
  const [user, setUser] = useState(null);
useEffect(()=>{
    var data = localStorage.getItem('user')
    if(data){
        setUser(JSON.parse(data))
    }
},[])
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<Main user={user} />}>
            <Route index element={<Home />} /> 
            <Route path="projects" element={<Projects />} /> 
            <Route path="profile" element={<Profile />} /> 
          </Route>
        ) : (
          <Route path="/" element={<Auth />}>
            <Route index element={<Login setUser={setUser} />} /> 
            <Route path="signup" element={<Signup />} /> 
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
