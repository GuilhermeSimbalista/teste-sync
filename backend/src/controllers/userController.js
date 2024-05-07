const pool = require('../config/dbConfig');

const getUsers = async (req, res) => {
    const results = await pool.query('SELECT * FROM users');
    res.status(200).json(results.rows);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
};

const createUser = async (req, res) => {
    const { name, age, street, neighborhood, state, biography } = req.body;
    const profile_image = req.file ? req.file.filename : null;

    try {
        const newUser = await pool.query(
            'INSERT INTO users (name, age, street, neighborhood, state, biography, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, age, street, neighborhood, state, biography, profile_image]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, street, neighborhood, state, biography } = req.body;
    const profile_image = req.file ? req.file.filename : null;

    try {
        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, age = $2, street = $3, neighborhood = $4, state = $5, biography = $6, profile_image = $7 WHERE id = $8 RETURNING *',
            [name, age, street, neighborhood, state, biography, profile_image, id]
        );
        res.status(200).json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send();
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
