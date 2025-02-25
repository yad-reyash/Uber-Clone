const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
        if (!firstname || !lastname || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};
