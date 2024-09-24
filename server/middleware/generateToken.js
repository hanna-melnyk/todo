//server/middleware/generateToken.js

import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log(`Token generated for user ${id}: ${token}`);
    return token;
};