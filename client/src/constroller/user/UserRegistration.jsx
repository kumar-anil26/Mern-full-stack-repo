import React, { useEffect, useState } from "react";
import { createNewEmployee, updateUser } from "../../services/user.service";

export default function UserRegistration({ user, onSuccess }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "",
  });
  useEffect(() => {
    if (user?._id) {
      setUserData(user);
    }
     }, [user]);
  const handlerChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
     createNewEmployee(userData);
    setUserData({
      name: "",
      email: "",
      password: "",
      department: "",
      role: "",
    });
  };

  const handlerUpdate = (e) => {
    e.preventDefault();
    updateUser(user._id, userData);
    setUserData({
      name: "",
      email: "",
      password: "",
      department: "",
      role: "",
    });
    onSuccess();
  };

  return (
    <div>
      <h1>REGISTRATION FORM</h1>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="Ener user name..."
          name="name"
          value={userData.name}
          onChange={handlerChange}
        />
        <br />
        <input
          type="email"
          placeholder="Ener user eamil..."
          name="email"
          value={userData.email}
          onChange={handlerChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter user password..."
          name="password"
          value={userData.password}
          onChange={handlerChange}
        />
        <br />
        <input
          type="taxt"
          placeholder="Ener department"
          name="department"
          value={userData.department}
          onChange={handlerChange}
        />
        <br />
        <select
          name="role"
          id=""
          onChange={handlerChange}
          value={userData.role}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        {!user?._id ? (
          <button onClick={handlerSubmit}>Submit</button>
        ) : (
          <button onClick={handlerUpdate}>Update</button>
        )}
      </form>
    </div>
  );
}
