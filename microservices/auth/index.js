import express from 'express';
import bodyParser from 'body-parser';
import OAuth2Server from 'node-oauth2-server';
import dotenv from 'dotenv';
import { sequelize } from './models'; // Sequelize instance
import oauthModel from './oauthModel.js'; // Custom OAuth2 model

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Set up OAuth2 server
app.oauth = new OAuth2Server({
    model: oauthModel,
    grants: ['password', 'refresh_token'], // Supported grant types
    debug: true,
});

// Token endpoint
app.post('/oauth/token', app.oauth.token());

// Centralized token validation endpoint
app.get('/oauth/validate', app.oauth.authenticate(), (req, res) => {
    res.send({ message: 'Token is valid', user: req.user });
});

// Database sync and start server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`OAuth2 API service running on port ${PORT}`);
    });
});
