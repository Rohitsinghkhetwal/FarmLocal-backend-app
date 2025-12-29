"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConnection_1 = require("./databaseConnection");
async function createTable() {
    const query = `CREATE TABLE Product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_category_price (category, price),
  INDEX idx_createdAt (createdAt),
  INDEX idx_name (name)
);
`;
    try {
        await databaseConnection_1.db.query(query);
        console.log("✅ Table created successfully");
    }
    catch (err) {
        console.error("❌ Error creating table:", err);
    }
    finally {
        databaseConnection_1.db.end();
    }
}
createTable();
