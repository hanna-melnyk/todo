// server/controllers/userController.js
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel.js';
import { generateToken } from '../middleware/generateToken.js';


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};


export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields only if they are different from the current values
        if (req.body.firstName && req.body.firstName !== user.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName && req.body.lastName !== user.lastName) {
            user.lastName = req.body.lastName;
        }
        if (req.body.email && req.body.email !== user.email) {
            // Check if the new email already exists in the database
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = req.body.email;
        }
        if (req.body.password) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                user.password = req.body.password;
            }
        }
        if (req.file && req.file.path !== user.profileImage) {
            user.profileImage = req.file.path; // Update profile image if a new file is uploaded
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            profileImage: updatedUser.profileImage,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};
