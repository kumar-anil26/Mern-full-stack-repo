import express from "express";
import {
  create_new_user,
  delete_user,
  get_all_users,
  update_user,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/createuser", create_new_user);
router.get("/getalluser", get_all_users);
router.delete("/deleteuser/:id", delete_user);
router.patch("/updateuser/:id", update_user);

export default router;
