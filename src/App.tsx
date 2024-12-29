/** @format */
import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/users");
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div>
      <h1>Cymulate</h1>
    </div>
  );
}

export default App;
