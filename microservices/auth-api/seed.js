import sequelize, { Client, User, Token,  } from './models/model.js';
import bcrypt from 'bcrypt';

async function seedDatabase() {
    try {
        // Sync database schema
        await sequelize.sync({ force: true }); // Drops and recreates tables (use cautiously in production)
        console.log('Database synced!');

        // Hash passwords for users
        const hashedPassword = await bcrypt.hash('demo123', 10); // Replace with actual passwords

        // Seed users
        const users = [
            { username: 'presales1', password: 'demo123'},
            { username: 'presales2', password: 'demo123' },
        ];
        await User.bulkCreate(users);
        console.log('Users seeded!');

        // Seed clients
        const clients = [
            {
                clientId: 'presales1',
                clientSecret: 'presales1secret',
                grants: 'password,refresh_token',
            },
            {
                clientId: 'presales2',
                clientSecret: 'presales2secret',
                grants: 'password,refresh_token',
            },
        ];
        await Client.bulkCreate(clients);
        console.log('Clients seeded!');

        // Optionally seed tokens (can be generated dynamically at runtime)
        const tokens = [
            {
                accessToken: 'sampleaccesstoken123',
                accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
                clientId: 'client1',
                userId: 1,
            },
        ];
        await Token.bulkCreate(tokens);
        console.log('Tokens seeded!');

        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
        console.log('Database connection closed!');
    }
}

// Run the seed function
seedDatabase();