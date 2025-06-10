import mysql from "mysql2/promise";

const db = mysql.createConnection({
    host: "db.retaildemo.net", // Replace with your MySQL server host
    user: "dbuser",      // Replace with your MySQL username
    password: "CAdemo123",      // Replace with your MySQL password
    database: "retailonlinestore" // Replace with your database name
});

export default db;