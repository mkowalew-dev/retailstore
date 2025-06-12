import express from 'express';
import bodyParser from 'body-parser';
import OAuth2Server, { Request, Response } from 'oauth2-server';
import oauthModel from './oauthModel.js';
import { initDatabase } from './models/model.js';

// Initialize the Express app
const app = express();

// Middleware for parsing form-urlencoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize the OAuth2 server
const oauth = new OAuth2Server({
    model: oauthModel, // Custom OAuth model
    grants: ['password', 'refresh_token'], // Supported grant types
    accessTokenLifetime: 3600, // 1 hour token lifetime
});

// Define the /oauth/token endpoint
app.post('/oauth/token', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
        const token = await oauth.token(request, response);
        res.json(token);
    } catch (err) {
        res.status(err.code || 500).json(err);
    }
});

// Define a protected endpoint
app.get('/secure', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
        const token = await oauth.authenticate(request, response);
        res.json({ message: 'Access granted!', user: token.user });
    } catch (err) {
        res.status(err.code || 500).json(err);
    }
});

// Start the server and initialize the database
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await initDatabase(); // Initialize the database
    console.log(`OAuth2 server running on http://localhost:${PORT}`);
});