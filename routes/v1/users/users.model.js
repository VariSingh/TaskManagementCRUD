const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash } = require("bcrypt");
const { BCRYPT_ROUNDS } = require("../../../util/constants");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await hash(this.password, BCRYPT_ROUNDS);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
