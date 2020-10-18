const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = process.env.SALT_ROUNDS || 10;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: String
});

UserSchema.methods.setHashedPassword = async function () {
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
};

UserSchema.methods.validatePassword = async function (password) {
  const pwdMatches = await bcrypt.compare(password, this.password);
  return pwdMatches;
};

UserSchema.methods.generateJwtToken = function () {
  var jwtSecret = process.env.JWT_SECRET_MANAGER;
  if(this.role == "employee"){
    jwtSecret = process.env.JWT_SECRET_EMPLOYEE
  }
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    jwtSecret
  );
};

UserSchema.methods.toAuthJson = function () {
  return {
    username: this.username,
    role: this.role,
    _id: this._id,
    token: this.generateJwtToken(),
  };
};

module.exports = mongoose.model('User', UserSchema);
