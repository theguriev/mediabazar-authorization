import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    role: { type: String, default: "user" },
    email: { type: String, unique: true },
    password: String,
    forgotPassword: {
      token: String,
      timestamp: Number,
    },
    meta: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  { timestamps: true },
);

export default userSchema;
