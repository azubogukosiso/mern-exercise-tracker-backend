const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dotenv = require('dotenv');
dotenv.config();

// route imports
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

// connection to the dbase
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  app.listen(process.env.API_PORT);
});

app.use(cors({
  origin: ["http://localhost:3000", "https://exercise-tracker-app-oxji.onrender.com"],
}));
app.use(express.json());

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
