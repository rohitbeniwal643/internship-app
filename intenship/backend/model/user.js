const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../service/authentication");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String, default: "B-Tech" },
  },
  { timestamps: true }
);

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");
  return generateToken(user);
};

module.exports = mongoose.model("User", userSchema);
