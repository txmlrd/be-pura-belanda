require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/database");
require("./models/user.model");
require("./models/membership.model");
require("./models/event.model");

// route import
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const eventRoutes = require("./routes/eventRoutes");
const app = express();
app.use(express.json());

//endpoint start
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/memberships", membershipRoutes);
app.use("/events", eventRoutes);
//endpoint end

//health check
app.get("/", (req, res) => {
  res.send("PURA BELANDA BACKEND SERVER. DO NOT ACCESS THIS SERVER DIRECTLY.");
});


// connect to db script
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Models synced");
  } catch (err) {
    console.error(err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
