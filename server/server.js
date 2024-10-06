//server/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {todoRoutes} from "./routes/todoRoutes.js";
import {userRoutes} from "./routes/userRoutes.js";
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

console.log('Logging the NODE_ENV:', process.env.NODE_ENV);

// Use routes:
app.use('/api', todoRoutes);
app.use('/api', userRoutes);
// Serve static files from the "uploads" directory
// Construct __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/check-image/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, 'uploads', req.params.imageName);
    if (fs.existsSync(imagePath)) {
        res.send(`Image ${req.params.imageName} exists!`);
    } else {
        res.status(404).send('Image not found');
    }
});


// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the frontend's `dist` folder
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Handle any other requests that don't match API routes by serving the frontend's index.html file
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
        }
    });
}

// Default root route (optional)
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running at http://localhost:${PORT}`);
    } else {
        console.log(`Server running in production mode on port ${PORT}`);
    }
});
