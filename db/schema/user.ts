import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
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
  { timestamps: true }
);

export default userSchema;
