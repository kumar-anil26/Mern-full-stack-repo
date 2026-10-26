import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required !"],
      trim: true,
      minLength: [3, "Name must be at least 3 character long !"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Emal must be required !"],
    },
    password: {
      type: String,
      trim: true,
      unique: true,
      select: false,
      required: [true, "Password must be at least 6 character !"],
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
  },
);

//! For password Hashing before save in database for security reason
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
