const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 100,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1024,
    trim: true,
  },
},{
    timestamps:true
});

const UserModel = mongoose.model("USER",userSchema);

module.exports = UserModel;