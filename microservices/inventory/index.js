const express = require('express');
const auth = require('./authMiddleware');

const app = express();
app.use(express.json());

// Secure all routes
app.use(auth);

// Register routes
app.use('/products', require('./routes/products'));
app.use('/stock', require('./routes/stock'));
app.use('/suppliers', require('./routes/suppliers'));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Inventory service running on port ${PORT}`);
});
