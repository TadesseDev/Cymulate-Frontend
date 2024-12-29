/** @format */

import React, { useState } from "react";
import "./signup.css";
import { createUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createUser({
        name: formData.name,
        password: formData.password,
        email: formData.email,
      })
    );
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <hr />
        <span className="dark-black">Or</span>
        <hr />
        <button type="submit" className="signup-button">
          Login Here..
        </button>
      </form>
    </div>
  );
};

export default Signup;
