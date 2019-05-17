// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Users.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

let cmdStr = `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INT)`

db.run(cmdStr, (err) => {
  if (err) {
    console.log("Table creation error",err);
  } else {
    console.log("Database created");
    // db.close();
  }
});

cmdStr = `INSERT INTO users (name, age) VALUES("Bob", 30)`;

db.run(cmdStr, (err) => {
  if (err) {
    console.log("Insertion error",err);
  } else {
    console.log("Data Inserted");
    // db.close();
  }
});

module.exports = db;
