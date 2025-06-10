const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM payments');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { order_id, amount, method } = req.body;
    const [result] = await db.query(
        'INSERT INTO payments (order_id, amount, method) VALUES (?, ?, ?)',
        [order_id, amount, method]
    );
    res.status(201).json({ id: result.insertId });
});

module.exports = router;
