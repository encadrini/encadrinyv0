import React, { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const login = async () => {
    try {
      console.log(info);

      const response = await axios.post(
        "http://92.222.25.73:3100/user/login",
        info
      );
      setUser(response.data);
      localStorage.setItem('user',JSON.stringify(response.data))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        onChange={handleChange}
        type="email"
        placeholder="email"
        name="email"
      />
      <input onChange={handleChange} type="password" placeholder="password" name="password"/>
      <button onClick={login}>GO</button>
    </div>
  );
}
