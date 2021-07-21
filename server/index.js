const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser")

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");

const dotenv = require("dotenv");
dotenv.config();

// database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

  app.use(cors());
  app.use(bodyParser());

  app.use("/api", authRoutes);

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));