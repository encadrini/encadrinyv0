import React, { useState } from "react";
import axios from "axios";

export default function Login({ setUser }) {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const login = async (e) => {

    try {
      e.preventDefault()

      const response = await axios.post(
        "http://localhost:3100/user/login",
        info
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="position-fixed h-100 w-100 d-flex justify-content-center align-items-center ">
      <form
        onSubmit={login}
        className="d-flex flex-column border p-3 gap-3 col-md-6 col-lg-4 col-10 rounded bg-secondary"
      >
        <h1 className="text-center">LOGIN</h1>
        <div>
          <label>Email</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="email"
            placeholder="email"
            name="email"
            required
          />
        </div>
        <div>
          <label>password</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="password"
            placeholder="password"
            name="password"
            required
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary col-6 " onSubmit={login}>
            GO
          </button>
        </div>
      </form>
    </div>
  );
}
