
// /app/lib/tableland_storage.js
import { Database } from '@tableland/sdk';

const db = new Database();

const tableName = 'user_meta_1_58'; // ✅ Update to your actual table name

export async function addUser(wallet, role) {
  const insertStmt = `INSERT INTO ${tableName} (wallet, role, status) VALUES ('${wallet}', '${role}', 'active');`;
  const result = await db.prepare(insertStmt).run();
  console.log('User added to Tableland:', result);
  return result;
}

export async function getUser(wallet) {
  const selectStmt = `SELECT * FROM ${tableName} WHERE wallet = '${wallet}';`;
  const { results } = await db.prepare(selectStmt).all();
  console.log('User info from Tableland:', results);
  return results;
}

export async function getUserStatus(wallet) {
  const selectStmt = `SELECT role FROM ${tableName} WHERE wallet = '${wallet}';`;
  const { results } = await db.prepare(selectStmt).all();
  console.log('User status from Tableland:', results);
  return results.length > 0 ? results[0].role : null;
}
