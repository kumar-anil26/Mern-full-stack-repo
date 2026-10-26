import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

//! Create new User
export const create_new_user = async (userData) => {
  const { name, email, password, department, role } = userData;
  if (
    !name ||
    name.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !department ||
    department.trim() === "" ||
    !role ||
    role.trim() === ""
  ) {
    throw new AppError(
      400,
      "Sorry! All Fields are require for user registration !",
    );
  }
  const newUser = await User.create({
    name,
    email,
    password,
    department,
    role,
  });
  return newUser;
};

//! Get all users
export const get_all_user = async () => {
  try {
    const response = await User.find().select("name email department role");
    return response;
  } catch (error) {
    throw new AppError(404, "Sorry ! Data not found");
  }
};

//! Delete User
export const delete_user = async (id) => {
  try {
    const response = await User.findByIdAndDelete(id);
    return response;
  } catch (error) {
    throw new AppError(404, "Sorry! User not found.");
  }
};

//! Update user
export const update_user = async (id, userData) => {
  const { name, email, department, role } = userData;

  try {
    const response = User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          department,
          role,
        },
      },
      { new: true },
    );
    return response;
  } catch (error) {
    throw new AppError(404, "SORRY ! User not found.");
  }
};
