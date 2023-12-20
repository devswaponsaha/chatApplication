const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Filed Are Require" });
    } else {
      if (validator.isEmail(email)) {
        let user = await UserModel.findOne({ email });
        if (validator.isStrongPassword(password)) {
          if (!user) {
            user = new UserModel({ name, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const token = createToken(user._id);
            res.status(200).send({ _id: user._id, name, email, token });
          } else {
            res.status(400).send({ message: "User Already Exist" });
          }
        } else {
          res.status(400).send({ message: "Please Set Strong Password" });
        }
      } else {
        res.status(400).send({ message: "Please Send Valid Email" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Filed Are Require" });
    } else {
      if (validator.isEmail(email)) {
        let user = await UserModel.findOne({ email });
        if (user) {
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
            const token = createToken(user._id);
            res
              .status(200)
              .send({ _id: user._id, name: user.name, email, token });
          } else {
            res.status(400).send({ message: "Invalid Password" });
          }
        } else {
          res.status(400).send({ message: "User Not Found" });
        }
      } else {
        res.status(400).send({ message: "Please Send Valid Email" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    let user = await UserModel.findById(userId,"-password");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUser = async(req,res)=>{
    try {
      let user = await UserModel.find({}, "-password -createdAt -updatedAt");
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

module.exports = { registerUser, loginUser, findUser,getUser };
