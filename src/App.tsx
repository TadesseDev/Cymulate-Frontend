/** @format */
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { createCat, fetchData } from "./redux/dataSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(createCat({ age: 12, breed: "random-updated", name: "my cat" }));
  }, [dispatch]);

  return (
    <div>
      <h1>Data Fetch Example</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>{items && items.map((item) => <li key={item._id}>{item.breed}</li>)}</ul>
      )}
    </div>
  );
}

export default App;
