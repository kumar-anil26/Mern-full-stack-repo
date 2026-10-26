import api from "./apiService";

//! Create new employee
export const createNewEmployee = async (userData) => {
  const result = await api.post("/user/createuser", userData);
};

//! Get all user
export const getAllUsers = async () => {
  const result = await api.get("/user/getalluser");
  return result.data;
};

//! Delete User
export const deleteUser = async (id) => {
  const result = await api.delete(`/user/deleteuser/${id}`);
  return result.data;
};

//! Update user
export const updateUser = async (id,userData) => {
  const result = await api.patch(`/user/updateuser/${id}`, userData);
  return result.data
};
