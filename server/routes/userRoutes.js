//server/routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

//Update user profile (protected route)
router.route('/profile').put(protect, upload.single('profileImage'), updateUserProfile);

export const userRoutes = router;

