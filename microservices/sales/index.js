const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const auth = require('./authMiddleware');
const orders = require('./routes/orders');
const payments = require('./routes/payments');
const invoices = require('./routes/invoices');

const app = express();
app.use(express.json());

// All endpoints are protected
app.use(auth);

// Route registration
app.use('/orders', orders);
app.use('/payments', payments);
app.use('/invoices', invoices);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Sales service listening on port ${PORT}`);
});
