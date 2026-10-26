import express from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/global.middleware.js";
import userRouter from "./routers/user.router.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const port = process.env.PORT || 5050;

//! User Router
app.use("/api/user", userRouter);

app.use(globalErrorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server running at port http://localhost:${port}`);
});
