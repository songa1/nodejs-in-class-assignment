const db = require("../Config/db");
const { generateHash } = require("../Middleware/auth");
const crypto = require("crypto");

async function getAll() {
  return new Promise((resolve, reject) => {
    let users = [];
    let sql = "SELECT * FROM users";

    db.query(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        for (let row of rows) {
          const user = {
            user_id: row.user_id,
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            created_at: row.created_at,
            updated_at: row.updated_at,
          };
          users.push(user);
        }
        resolve(users);
      }
    });
  });
}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users WHERE user_id = ?";

    db.query(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length > 0) {
          const row = rows[0];
          const user = {
            user_id: row.user_id,
            user_name: row.user_name,
            user_email: row.user_email,
            user_phone: row.user_phone,
            created_at: row.created_at,
            updated_at: row.updated_at,
          };
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  });
}

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE user_email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error retrieving user from the database: ", err);
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      console.log("User not found");
      callback("User not found", null);
      return;
    }
    const user = results[0];
    callback(null, user);
  });
};

const addUser = async (user) => {
  try {
    // Build the SQL query
    const query = `INSERT INTO users (user_id, user_name, user_email, user_phone, user_password, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

    let user_password = generateHash(user.user_password);
    let created_at = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    let updated_at = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

    await db.query(query, [
      crypto.randomUUID(),
      user.user_name,
      user.user_email,
      user.user_phone,
      user_password,
      created_at,
      updated_at,
    ]);

    return true;
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};

const deleteUser = async (id, callback) => {
  let user = await getUser(id);
  console.log(user);
  if (user) {
    try {
      const query = "DELETE FROM users WHERE user_id = ?";
      db.query(query, [id], (err, result) => {
        if (err) {
          console.error("Error deleting user from the database: ", err);
          callback(err, null);
        } else if (result.length === 0) {
          console.log("User not found");
          callback("User not found", null);
        } else {
          const user = result;
          callback(null, user);
        }
      });
    } catch (error) {
      callback(error.message, null);
    }
  } else {
    callback("User not found", null);
  }
};

const updateUser = (userId, updatedData, callback) => {
  const { user_name, user_email, user_phone } = updatedData;

  // Execute the database update query

  let updatedDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  db.query(
    "UPDATE users SET user_name = ?, user_email = ?, user_phone = ?, updated_at = ? WHERE user_id = ?",
    [user_name, user_email, user_phone, updatedDate, userId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports = {
  getAll,
  getUser,
  addUser,
  getUserByEmail,
  deleteUser,
  updateUser,
};
