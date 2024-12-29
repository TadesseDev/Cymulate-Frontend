/** @format */

function Users() {
  return (
    <div>
      user home page
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
}

export default Users;
