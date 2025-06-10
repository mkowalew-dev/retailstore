const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM invoices');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { order_id } = req.body;
    const [result] = await db.query(
        'INSERT INTO invoices (order_id) VALUES (?)',
        [order_id]
    );
    res.status(201).json({ id: result.insertId });
});

module.exports = router;
