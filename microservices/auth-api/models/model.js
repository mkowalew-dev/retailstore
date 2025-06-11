import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE,
    process.env.MARIADB_USER,
    process.env.MARIADB_PASSWORD,
    {
        host: process.env.MARIADB_HOST,
        dialect: 'mysql',
    }
);

// Define models
export const OAuthClients = sequelize.define('OAuthClients', {
    clientId: { type: Sequelize.STRING, primaryKey: true },
    clientSecret: Sequelize.STRING,
    grants: Sequelize.STRING,
});

export const OAuthTokens = sequelize.define('OAuthTokens', {
    accessToken: { type: Sequelize.STRING, primaryKey: true },
    accessTokenExpiresAt: Sequelize.DATE,
    clientId: Sequelize.STRING,
    userId: Sequelize.STRING,
});

export const OAuthUsers = sequelize.define('OAuthUsers', {
    username: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
});

export { sequelize };