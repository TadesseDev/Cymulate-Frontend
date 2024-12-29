/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createUser, fetchUsers } from "../../redux/slices/userSlice";

function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, error, isLoading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
    // dispatch(
    //   createUser({
    //     name: "first user",
    //     password: "dummy password",
    //     email: "dummyemail@samplemail.com",
    //   })
    // );
  }, [dispatch]);

  console.log(users.length, users);
  return (
    <div>
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <ul>
          {users.length ? (
            users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.password} - {user.email}
              </li>
            ))
          ) : (
            <div>No user</div>
          )}
        </ul>
      )}
    </div>
  );
}

export default Users;
