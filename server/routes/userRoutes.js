//server/routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

export const userRoutes = router;

