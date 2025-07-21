const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect /auth route
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Colonize-Mars Backend is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
