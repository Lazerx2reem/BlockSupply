import { Database } from "@tableland/sdk";

// Replace with your actual table name
const tableName = "users_12345_80001"; // example: users_12345_80001

// Initialize once
const db = new Database();

/**
 * Get user by wallet address
 * @param {string} wallet - User wallet address
 * @returns {Promise<object|null>} - Returns user object or null
 */
export const getUserByWallet = async (wallet) => {
  try {
    const stmt = await db.prepare(`SELECT * FROM ${tableName} WHERE wallet = ?`);
    const { results } = await stmt.bind(wallet).all();

    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};

/**
 * Register a new user
 * @param {string} wallet - User wallet address
 * @param {'customer'|'manufacturer'} role - User role
 * @returns {Promise<boolean>} - Success status
 */
export const registerUser = async (wallet, role) => {
  try {
    const stmt = await db.prepare(
      `INSERT INTO ${tableName} (wallet, role, status) VALUES (?, ?, ?)`
    );
    await stmt.bind(wallet, role, 'active').run();
    return true;
  } catch (err) {
    console.error("Error registering user:", err);
    return false;
  }
};

/**
 * Update a user role or status
 * @param {string} wallet - Wallet to update
 * @param {object} updates - Fields to update, e.g. { role: 'manufacturer' }
 */
export const updateUser = async (wallet, updates = {}) => {
  try {
    const fields = Object.entries(updates)
      .map(([key, _]) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);

    const stmt = await db.prepare(
      `UPDATE ${tableName} SET ${fields} WHERE wallet = ?`
    );
    await stmt.bind(...values, wallet).run();
    return true;
  } catch (err) {
    console.error("Error updating user:", err);
    return false;
  }
};
