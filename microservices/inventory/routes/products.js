const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    const [result] = await db.query(
        'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
        [name, description, price]
    );
    res.status(201).json({ id: result.insertId });
});

module.exports = router;
