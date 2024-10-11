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

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = sign(
    { userID: user._id, userfname: user.firstname },
    JWT_SECRET
  );
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

  res.json({
    message: "User is created successfully",
    token: token,
  });
});

// Update Profile Route (first name, last name, and password)
router.put("/updateProfile", authMiddleware, async (req, res) => {
  const { firstname, lastname, password } = req.body;

  // Check if the required fields are present
  if (!firstname || !lastname || !password) {
    return res.status(400).json({
      message: "Please provide first name, last name, and password.",
    });
  }

  // Update only the allowed fields (firstname, lastname, and password)
  try {
    const updatedUser = await UserList.updateOne(
      { _id: req.userID }, // Match the authenticated user
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          password: password,
        },
      }
    );

    if (updatedUser.nModified === 0) {
      return res.status(400).json({
        message: "No changes were made to the profile.",
      });
    }

    res.json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the profile.",
    });
  }
});

// Get Profile Info Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Find the user by the userID from the token
    const user = await UserList.findById(req.userID, {
      firstname: 1,
      lastname: 1,
      email: 1,
      password: 1,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Send the user's profile information
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the profile.",
    });
  }
});

// Get Users Route
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter;
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
