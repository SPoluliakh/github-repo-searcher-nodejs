const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const libraryRouter = require("./routes/api/libraryRouter");
const authRouter = require("./routes/api/authRouts");
const usersRouter = require("./routes/api/usersRouts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const options = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/library", libraryRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
