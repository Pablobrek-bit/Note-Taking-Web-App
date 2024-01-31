const createUsers = require("./createUsers")
const sqliteConnection = require("../../sqlite")

// This function will be start the database and run the command to create the tables
async function migrationRun() {
  // Create the tables
  const schemas = [createUsers].join("")

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error))
}

module.exports = migrationRun
