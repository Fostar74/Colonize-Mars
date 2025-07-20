// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample route to confirm backend is live
app.get('/', (req, res) => {
  res.send('Mars Strategy Server is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
