import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Please enter name and email");

    try {
      await axios.post("http://localhost:8080/api/users", { name, email });
      alert("User added successfully!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add New User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
