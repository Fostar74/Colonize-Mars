const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const USERS_FILE = path.join(__dirname, "data/users.json");

app.use(cors());
app.use(express.json());

// Load users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register route
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const users = loadUsers();
  if (users.find((u) => u.email === email)) return res.status(409).json({ error: "Email already exists" });

  users.push({ email, password });
  saveUsers(users);
  res.json({ success: true });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("Colonize-Mars Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
