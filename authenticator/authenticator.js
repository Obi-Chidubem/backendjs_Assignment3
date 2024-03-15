const fs = require("fs");
const path = require("path");

const DatabasePath = path.join(__dirname, "database", "users.json");

function retrieveUsers() {
  return DatabasePath;
}

module.exports = { retrieveUsers };
