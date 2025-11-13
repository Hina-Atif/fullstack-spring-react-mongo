import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // Fetch users from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add user to backend
  const handleAddUser = () => {
    if (!name) return;
    axios
      .post("http://localhost:8080/users", { name })
      .then((res) => {
        setUsers([...users, res.data]);
        setName("");
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>👩‍💻 Hina Atif’s Full Stack App</h1>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={handleAddUser} style={{ padding: "8px 16px" }}>
        Add User
      </button>

      <h2 style={{ marginTop: "30px" }}>User List:</h2>
      {users.length === 0 ? (
        <p>No users found yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
