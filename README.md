# Colonize Mars - A Mars Colonization Game

## Recent Changes - Removed localStorage

### Changes Applied:

1. **Complete removal of localStorage**: User data is no longer stored in localStorage
2. **Using sessionStorage**: Temporary data is now only stored in sessionStorage for the session duration
3. **Full data storage in the database**: All user data, game progress, and equipment are now saved in the SQLite database
4. **New APIs**: New APIs have been added for managing equipment

### Database Structure:

#### Existing Tables:

- **users**: User information (email, username, password)
- **game_progress**: Game progress (castle, resources, structures)
- **game_stats**: Game stats (play time, resources extracted, structures built)
- **user_equipment**: User equipment (equipped items, inventory, crafting scores)

### Available APIs:

#### Authentication:

- `POST /register` - Register a new user
- `POST /login` - User login

#### Game Progress:

- `POST /save-progress` - Save game progress
- `GET /get-progress/:userId` - Get game progress
- `POST /update-stats` - Update game stats

#### Equipment:

- `POST /save-equipment` - Save equipment
- `GET /get-equipment/:userId` - Get equipment
- `POST /update-equipment` - Update equipment

### How to Run:

1. **Install dependencies**:

```bash
npm install
```

2. **Run the server**:

```bash
node server.js
```

3. **Run the frontend**:

```bash
npm start
```

### Database Testing:

To view all database information, you can use the following test files:

#### 1. Complete Database Test:

```bash
node test-database.js
```

This file displays all database information with complete details.

#### 2. Simple Database Test:

```bash
node simple-test-db.js
```

This file displays a summary of database information.

#### 3. Specific User Data Test:

```bash
node test-user-data.js [USER_ID]
```

Example:

```bash
node test-user-data.js 1
```

This file displays complete information for a specific user.

### Key Features:

- **High security**: All data is securely stored in the database
- **Synchronization**: Data is synced across all devices
- **Backup**: Database backup is supported
- **Better performance**: No dependency on localStorage

### Important Notes:

- User data is only stored in sessionStorage and will be cleared when the browser is closed
- All changes are automatically saved to the database
- If the internet connection is lost, changes are stored in sessionStorage and synced later

### Technologies Used:

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)
- **Authentication**: bcrypt
- **Routing**: React Router DOM
