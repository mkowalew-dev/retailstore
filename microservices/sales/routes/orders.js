const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM orders');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { customer_id, total } = req.body;
    const [result] = await db.query(
        'INSERT INTO orders (customer_id, total) VALUES (?, ?)',
        [customer_id, total]
    );
    res.status(201).json({ id: result.insertId });
});

module.exports = router;
