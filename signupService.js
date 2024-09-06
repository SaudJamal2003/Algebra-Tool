const bcrypt = require('bcrypt');
const db = require('./db');

const saltRounds = 10; 
module.exports.databaseEntry = async (email, password) => {
    try {
        console.log('Method: ', email, " ", password);

        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        await db.query('INSERT INTO  headstarter_ai.user_credentails (email, user_password) VALUES (?, ?)', 
            [email, password]
        );

        console.log('User credentials stored successfully.');
    } catch (error) {
        console.error('Error storing user credentials:', error);
    }
}
