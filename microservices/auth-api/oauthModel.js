import { OAuthClients, OAuthTokens, OAuthUsers } from './models/model.js';

export default {
    getAccessToken: async (accessToken) => {
        return await OAuthTokens.findOne({ where: { accessToken } });
    },
    getClient: async (clientId, clientSecret) => {
        return await OAuthClients.findOne({ where: { clientId, clientSecret } });
    },
    saveToken: async (token, client, user) => {
        const savedToken = await OAuthTokens.create({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            clientId: client.clientId,
            userId: user.id,
        });
        return {
            accessToken: savedToken.accessToken,
            client: { id: client.clientId },
            user: { id: user.id },
        };
    },
    getUser: async (username, password) => {
        return await OAuthUsers.findOne({ where: { username, password } });
    },
};