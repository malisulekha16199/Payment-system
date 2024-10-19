// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./Routes/index");

const app = express();

app.options('*', cors());  // Allow all OPTIONS requests
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
