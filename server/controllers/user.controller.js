import * as userService from "../services/user.service.js";
import AppError from "../utils/AppError.js";

//! Create new user

export const create_new_user = async (req, res) => {
  const userData = req.body;
  try {
    const response = await userService.create_new_user(userData);
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      User_details: response,
    });
  } catch (error) {
    throw new AppError(500, "Dublicate Email.");
  }
};

//! Get All User
export const get_all_users = async (req, res) => {
  try {
    const data = await userService.get_all_user();
    return res.status(200).json({
      success: true,
      message: "All users fetch successfully",
      Users: data,
    });
  } catch (error) {
    throw new AppError(500, error.message);
  }
};

//! Delete user
export const delete_user = async (req, res) => {
  const { id } = req?.params;
  try {
    const result = await userService.delete_user(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      DeletedUser: result,
    });
  } catch (error) {
    throw new AppError(500, "Internal server error");
  }
};

//! Update user
export const update_user = async (req,res) => {
  const { id } = req?.params;
  const userData = req.body;
  try {
    const result = await userService.update_user(id, userData);
    res.status(200).json({
      success: true,
      message: "User update successfully",
      updateUser: result,
    });
  } catch (error) {
    throw new AppError(500, "Internal server error");
  }
};
