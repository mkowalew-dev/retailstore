const axios = require('axios');

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.post(process.env.AUTH_URL, { token });
        if (!response.data?.active) {
            return res.status(401).json({ error: 'Token expired or invalid' });
        }
        req.user = response.data.user;
        next();
    } catch {
        return res.status(401).json({ error: 'Token verification failed' });
    }
};
