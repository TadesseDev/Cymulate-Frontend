/** @format */

import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createAttempt, fetchAttempts } from "../../redux/slices/stemptSlice";

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", content: "" });
  const [error, setError] = useState<string | null>(null);
  const attempts = useSelector((state: RootState) => state.attempts.attempts);
  const dispatch = useDispatch<AppDispatch>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.content) {
      dispatch(
        createAttempt({ email: formData.email, content: formData.content, triggered: false })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchAttempts());
    if (!localStorage.getItem("access_token")) {
      setError("Please login first");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="email-form-container">
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <span className="error">
            <small>{error}</small>
          </span>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>

      <table className="email-table">
        <thead className="dark-black ">
          <tr>
            <th>Email</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="dark-black ">
          {attempts.length &&
            attempts.map((attempt, index) => (
              <tr key={index}>
                <td>{attempt.email}</td>
                <td>{attempt.content}</td>
                <td>{attempt.triggered ? "user fall for the link" : "not triggered"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default EmailForm;
