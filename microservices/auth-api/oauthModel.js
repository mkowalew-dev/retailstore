import { User, Client, Token } from './models/model.js';

export default {
    // Validate the client (clientId and clientSecret)
    async getClient(clientId, clientSecret) {
        const client = await Client.findOne({ where: { clientId, clientSecret } });
        if (!client) return null;

        return {
            id: client.clientId,
            grants: client.grants.split(','), // Grants stored as comma-separated values
        };
    },

    // Validate user credentials (username and password)
    async getUser(username, password) {
        const user = await User.findOne({ where: { username, password } }); // Use hashed password in production
        return user ? { id: user.id } : null;
    },

    // Save the token (accessToken and refreshToken)
    async saveToken(token, client, user) {
        const savedToken = await Token.create({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            clientId: client.id,
            userId: user.id,
        });

        return {
            accessToken: savedToken.accessToken,
            accessTokenExpiresAt: savedToken.accessTokenExpiresAt,
            refreshToken: savedToken.refreshToken,
            refreshTokenExpiresAt: savedToken.refreshTokenExpiresAt,
            client: { id: savedToken.clientId },
            user: { id: savedToken.userId },
        };
    },

    // Retrieve an access token
    async getAccessToken(accessToken) {
        const token = await Token.findOne({ where: { accessToken } });
        if (!token) return null;

        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: { id: token.clientId },
            user: { id: token.userId },
        };
    },

    // Retrieve a refresh token (if using refresh_token grant)
    async getRefreshToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } });
        if (!token) return null;

        return {
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: { id: token.clientId },
            user: { id: token.userId },
        };
    },

    // Revoke a refresh token
    async revokeToken(token) {
        const result = await Token.destroy({ where: { refreshToken: token.refreshToken } });
        return result > 0; // Return true if a token was deleted
    },
};