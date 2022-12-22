const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const { updateEntries, handleApiCall } = require("./controllers/image");
const { getProfile } = require("./controllers/profile");
const saltRounds = 10;

app.use(express.json());
app.use(cors());

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db, saltRounds);
});
app.put("/image", (req, res) => {
  updateEntries(req, res, db);
});
app.get("/profile/:id", (req, res) => {
  getProfile(req, res, db);
});
app.post("/api", (req, res) => {
  handleApiCall(req, res);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
