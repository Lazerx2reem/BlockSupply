import { Database } from "@tableland/sdk";


const usersTable = "Table_1_60";
const productsTable = "products_12345_80001"; 

// Initialize once
const db = new Database();

/**
 * Get user by wallet address
 * @param {string} wallet - User wallet address
 * @returns {Promise<object|null>} - Returns user object or null
 */
export const getUserByWallet = async (wallet) => {
  try {
    const stmt = await db.prepare(`SELECT * FROM ${usersTable} WHERE wallet = ?`);
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
      `INSERT INTO ${usersTable} (wallet, role, status) VALUES (?, ?, ?)`
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
      `UPDATE ${usersTable} SET ${fields} WHERE wallet = ?`
    );
    await stmt.bind(...values, wallet).run();
    return true;
  } catch (err) {
    console.error("Error updating user:", err);
    return false;
  }
};

/**
 * Register a product
 * @param {object} product - Product details { barcode, name, description, manufactureDate, expiryDate, createdBy }
 */
export const registerProduct = async ({ barcode, name, description, manufactureDate, expiryDate, createdBy }) => {
  try {
    const stmt = await db.prepare(
      `INSERT INTO ${productsTable} (barcode, name, description, manufacture_date, expiry_date, created_by) VALUES (?, ?, ?, ?, ?, ?)`
    );
    await stmt.bind(barcode, name, description, manufactureDate, expiryDate, createdBy).run();
    return true;
  } catch (err) {
    console.error("Error registering product:", err);
    return false;
  }
};

/**
 * Get product by barcode
 * @param {string} barcode - Product barcode
 * @returns {Promise<object|null>} - Returns product object or null
 */
export const getProductByBarcode = async (barcode) => {
  try {
    const stmt = await db.prepare(`SELECT * FROM ${productsTable} WHERE barcode = ?`);
    const { results } = await stmt.bind(barcode).all();
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
};
