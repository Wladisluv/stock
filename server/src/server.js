// server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const manufacturerRoutes = require("./routes/manufacturerRoutes");
const goodRoutes = require("./routes/goodRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/goods", goodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
