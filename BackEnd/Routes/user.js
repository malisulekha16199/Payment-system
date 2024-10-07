const express = require("express");
const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserList, Account } = require("../DataBase");
const { createUser, SignInUser, updateUser } = require("../types");
const { authMiddleware } = require("../middlewares");

const router = express.Router();
// SignIn Route
router.post("/SignIn", async (req, res) => {
  const { email, password } = req.body;
  const passed = SignInUser.safeParse({ email, password });

  if (!passed) {
    return res.status(400).json({
      message: "Enter valid email",
    });
  }

  const user = await UserList.findOne({
    email: email,
    password: password,
  });
  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = sign(
    { userID: user._id, userfname: user.firstname },
    JWT_SECRET
  );
  console.log(token);
  res.json({
    message: "Login successful",
    token: token,
  });
});

// SignUp Route
router.post("/SignUp", async (req, res) => {
  const body = req.body;
  const passed = createUser.safeParse(body);

  if (!passed.success) {
    return res.status(400).json({
      message: passed.error.errors,
    });
  }

  const user = await UserList.findOne({
    email: body.email,
  });

  if (user) {
    return res.status(400).json({
      message: "Email already exists, use another email",
    });
  }

  const dbUser = await UserList.create(body);
  const userID = dbUser._id;
  await Account.create({
    userID: userID,
    balance: 1 + Math.random() * 10000,
  });
  const token = sign(
    { userID: userID, userfname: dbUser.firstname },
    JWT_SECRET
  );
  console.log(token);
  res.json({
    message: "User is created successfully",
    token: token,
  });
});

// Update User Route
router.put("/", authMiddleware, async (req, res) => {
  const success = updateUser.safeParse(req.body);

  if (!success.success) {
    return res.status(400).json({
      message: "Please provide valid data",
    });
  }

  await UserList.updateOne({ email: req.body.email }, req.body);

  res.json({
    message: "User updated successfully.",
  });
});

// Get Users Route
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter;
  console.log(req.userID);
  const users = await UserList.find({
    _id: { $ne: req.userID }, // Exclude the user with the req.userID
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users.map((user) => ({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      _id: user._id,
    })),
  });
});

module.exports = { router };
