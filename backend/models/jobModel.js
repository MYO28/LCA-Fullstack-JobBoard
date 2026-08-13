const pool = require("../config/db");

const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);
  return rows[0];
};

const create = async ({ title, company, location, description }) => {
  const [result] = await pool.query("INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)", [
    title,
    company,
    location,
    description,
  ]);
  return getById(result.insertId);
};

const update = async (id, { title, company, location, description }) => {
  await pool.query("UPDATE jobs SET title = ?, company = ?, location = ?, description = ? WHERE id = ?", [
    title,
    company,
    location,
    description,
    id,
  ]);
  return getById(id);
};

const remove = async (id) => {
  const [result] = await pool.query("DELETE FROM jobs WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };
