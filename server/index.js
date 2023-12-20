const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routers/userRoute");
const chatRoute = require("./routers/chatRoute");
const messageRoute = require("./routers/messageRoute");
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", messageRoute);

const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send({ message: "OK" });
});

const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URL;
app.listen(PORT, () => {
  console.log(`Server Side Running PORT ${PORT}`);
});

mongoose
  .connect(`${uri}/chatApp`)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("MongoDB connection failed: ", err.message));
