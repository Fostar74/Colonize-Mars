const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Load and Save users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const users = loadUsers();

  const emailExists = users.find(user => user.email === email);
  const usernameExists = users.find(user => user.username === username);

  if (emailExists) {
    return res.status(409).json({ message: 'Email is already registered.' });
  }

  if (usernameExists) {
    return res.status(409).json({ message: 'Username is already taken.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    username,
    password: hashedPassword
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Registration successful!' });
});

// LOGIN (using username + password)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  res.status(200).json({ message: 'Login successful!', username: user.username });
});

module.exports = router;
