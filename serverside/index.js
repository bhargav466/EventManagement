const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const bodyParser = require("body-parser");

require("dotenv/config");

const userRoutes = require("./routes/userRoutes");

const eventRoutes = require("./routes/eventRoutes");

const venueRoutes = require("./routes/venueRoutes");

app.use(bodyParser.json());
app.use(cors());

app.use("/userRegistration", userRoutes);

app.use("/eventRegistration", eventRoutes);

app.use("/venueRegistration", venueRoutes);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Successfully connected DB");
  } catch (err) {
    console.log("unable to connect ", err);
  }
};

connect();

app.listen(4000, () => console.log("Listenting to port 4000......."));
