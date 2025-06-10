const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM stock');
    res.json(rows);
});

router.post('/', async (req, res) => {
    const { product_id, quantity } = req.body;
    const [result] = await db.query(
        'INSERT INTO stock (product_id, quantity) VALUES (?, ?)',
        [product_id, quantity]
    );
    res.status(201).json({ id: result.insertId });
});

module.exports = router;
