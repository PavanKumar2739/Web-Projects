const path = require("path");

const sqlite3 = require("sqlite3").verbose();

async function getSqlLiteDB(dbName = "../connect.db") {
  const dbpath = path.resolve(__dirname, dbName);

  const db = new sqlite3.Database(dbpath);
  return db;
}
module.exports = { getSqlLiteDB };
