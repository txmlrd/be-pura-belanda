require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/database");
require("./models");

// route import
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const eventRoutes = require("./routes/eventRoutes");
const eventAttendeeRoutes = require("./routes/eventAttendeeRoutes");
const userFamilyMemberRoutes = require("./routes/userFamilyMemberRoutes");
const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3001",       
    "http://127.0.0.1:3001",
  ],
  credentials: true,
}));



//endpoint start
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/users/family-members", userFamilyMemberRoutes);
app.use("/memberships", membershipRoutes);
app.use("/events", eventRoutes);
app.use("/events", eventAttendeeRoutes);
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
