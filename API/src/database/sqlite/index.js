const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")

// Function to open the database
async function openDb() {
  const database = await sqlite.open({
    // Path to the database
    filename: path.resolve(__dirname, "..", "database.db"),
    // Driver to use
    driver: sqlite3.Database,
  })

  return database
}

module.exports = openDb
