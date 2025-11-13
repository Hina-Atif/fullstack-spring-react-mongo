import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from './UserService'; // ✅ named imports

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load users from backend
  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle add user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter both name and email");
      return;
    }

    createUser({ name, email })
      .then(res => {
        setUsers([...users, res.data]); // ✅ use res.data
        setName("");
        setEmail("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>User Management App 👩‍💻</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <input 
          type="email" 
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", width: "100%" }}>Add User</button>
      </form>

      {/* Users Table */}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
