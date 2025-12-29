
import { db } from "../config/databaseConnection";
import { retry } from "../utils/retry";

export async function getProducts(query: any) {
  const { cursor, take = 20, search, category } = query;

  const params: any[] = [];
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

  return retry(async () => {
    const [rows] = await db.query(sql, params);
    return rows;

  })

  
}
