"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
const databaseConnection_1 = require("../config/databaseConnection");
const retry_1 = require("../utils/retry");
async function getProducts(query) {
    const { cursor, take = 20, search, category } = query;
    const params = [];
    let sql = `
    SELECT *
    FROM Product
    WHERE 1 = 1
  `;
    // Filter by category
    if (category) {
        sql += ` AND category = ?`;
        params.push(category);
    }
    // Search by name or description
    if (search) {
        sql += ` AND (name LIKE ? OR description LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }
    // Cursor-based pagination
    if (cursor) {
        sql += ` AND id < ?`;
        params.push(Number(cursor));
    }
    // Sorting + limit
    sql += `
    ORDER BY createdAt DESC
    LIMIT ?
  `;
    params.push(Number(take));
    //wrapping up db call with retry 
    return (0, retry_1.retry)(async () => {
        const [rows] = await databaseConnection_1.db.query(sql, params);
        return rows;
    });
}
