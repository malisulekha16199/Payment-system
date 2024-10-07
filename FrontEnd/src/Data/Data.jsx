import { atom } from "recoil";

const users = atom({
  key: "users",
  default: [],
});
const filter = atom({
  key: "filter",
  default: "",
});
const FirstName = atom({
  key: "FirstName",
  default: "",
});
const LastName = atom({
  key: "LastName",
  default: "",
});
const Email = atom({
  key: "Email",
  default: "",
});
const Password = atom({
  key: "Password",
  default: "",
});

const balance = atom({
  key: "balance",
  default: 0,
});

const Amount = atom({
  key: "Amount",
  default: 0,
});
export { users, filter, FirstName, LastName, Email, Password, balance, Amount };
