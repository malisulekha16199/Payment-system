// backend/index.js
const express = require("express");
const cors = require("cors");
const rootRouter = require("./Routes/index");

const app = express();

const corsOptions = {
  origin: 'https://payment-system-flms.vercel.app/',  // Replace with your Vercel domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
