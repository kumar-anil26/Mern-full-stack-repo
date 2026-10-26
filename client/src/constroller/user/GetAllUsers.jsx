import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../services/user.service";
import UserRegistration from "./UserRegistration";

export default function GetAllUsers() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const handleShowUsers = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await getAllUsers();
      setUserDetails(result.Users);
    } catch (err) {
      setError(err.response?.data?.message || "Internal server error !");
    } finally {
      setLoading(false);
    }
  };

  //! Delete handler
  const handlerDelete = async (id) => {
    const result = await deleteUser(id);
    handleShowUsers();
  };

  //! Update handler
  const handlerUpdate = (id, user) => {
    setIsEditing(user);
  };

  // Fetch automatically on mount
  useEffect(() => {
    handleShowUsers();
  }, [isEditing]);

  if (isEditing) {
    return (
      <div>
        <UserRegistration
          user={isEditing}
           onSuccess={() => {
            setIsEditing(null);
            getAllUsers();
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>ALL USERS DETAILS</h1>
      <button onClick={handleShowUsers}>Refresh Users</button>

      {loading && <h3>Loading...</h3>}
      {error ? (
        <h2 style={{ color: "red" }}>Error : {error}</h2>
      ) : !userDetails.length ? (
        <h2>Empty User table</h2>
      ) : (
        <table border={1} cellPadding={"10px"} style={{ padding: "5px" }}>
          <thead>
            <tr style={{ border: "solid 2px black" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userDetails?.map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handlerDelete(user._id)}>
                    Delete
                  </button>
                  <button onClick={() => handlerUpdate(user._id, user)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
