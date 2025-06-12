import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE, // Database name
    process.env.MARIADB_USER,     // Database user
    process.env.MARIADB_PASSWORD, // Database password
    {
        host: process.env.MARIADB_HOST, // Database host
        dialect: 'mariadb',                            // Use MariaDB dialect
        logging: true,                                // Disable Sequelize logging
    }
);

// Define the `users` table
export const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

// Define the `clients` table
export const Client = sequelize.define('Client', {
    clientId: { type: DataTypes.STRING, primaryKey: true },
    clientSecret: { type: DataTypes.STRING, allowNull: false },
    grants: { type: DataTypes.STRING, allowNull: false }, // Comma-separated grants
});

// Define the `tokens` table
export const Token = sequelize.define('Token', {
    accessToken: { type: DataTypes.STRING, primaryKey: true },
    accessTokenExpiresAt: { type: DataTypes.DATE, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
    refreshTokenExpiresAt: { type: DataTypes.DATE },
    clientId: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
});

// Sync models with the database
export const initDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MariaDB successfully!');
        await sequelize.sync({ alter: true }); // Sync tables
        console.log('Database tables created or updated.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default sequelize;