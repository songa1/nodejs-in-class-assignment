const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "node",
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = conn;
