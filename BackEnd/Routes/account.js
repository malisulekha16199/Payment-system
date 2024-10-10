// backend/routes/account.js
const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../DataBase");
const { default: mongoose } = require("mongoose");

const router = express.Router();
router.use(authMiddleware);
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userID: req.userID,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userID: req.userID }).session(
      session
    );
    if (amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Amount should be greater than 0",
      });
    }
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userID: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userID: req.userID },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userID: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (err) {
    console.log(err);
  } finally {
    await session.endSession();
  }
});

module.exports = { router };
