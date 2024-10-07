const mongoose = require("mongoose");

const { connect, Schema, model } = mongoose;

// Connect to MongoDB
connect("mongodb+srv://admin:1234admin@cluster0.rnqynd8.mongodb.net/PayTMDB");
const schema = Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

const accSchema = Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "userinfos",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const UserList = model("userinfos", schema);
const Account = model("account", accSchema);

module.exports = {
  UserList,
  Account,
};
