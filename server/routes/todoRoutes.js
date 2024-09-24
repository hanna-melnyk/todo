// server/routes/todoRoutes.js
import express from 'express';
import { getAllTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todoController.js'; // Import the controllers
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get all todos
router.get('/todos', protect, getAllTodos);

// Route to add a new todo
router.post('/todos', protect, addTodo);

// Route to update a todo (including completion status)
router.put('/todos/:id', protect, updateTodo);

// Route to delete a todo by ID
router.delete('/todos/:id', protect, deleteTodo);

export const todoRoutes = router;
