import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URL);
    console.log("Data Connected successfully!");
  } catch (error) {
    console.log(`Database connection error ${error.message}`);
    return;
  }
};
