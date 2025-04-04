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
      <form className="col-md-4 gap-3 d-flex flex-column border border border-primary rounded p-3 bg-secondary text-white">
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
          <label>Password</label>
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
          <button
            className="btn btn-primary col-3 "
            type="submit"
            onSubmit={login}
          >
            GO
          </button>
        </div>
      </form>
    </div>
  );
}
