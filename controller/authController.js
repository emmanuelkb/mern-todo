const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send("Fill required fills");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashedPassword);

  const user = await User.create({ email, username, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });

  res.status(201).json({ token });
};

const verifyToken = async (req, res, next) => {
  let token = req.headers["Authorization"];

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  token = token.split(" ")[1];

  try {
    let user = jwt.verify(token, "123456789");
    req.user = user.id;
    console.log(user);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }

  next();
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: " You are not authorized to view this information" });
  }
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User succesfully deleted" });
};

module.exports = {
  register,
  login,
  verifyToken,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
