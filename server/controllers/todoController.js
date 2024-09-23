// server/controllers/todoController.js
import { Todo } from '../models/todoModel.js';


export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch todos from MongoDB
        res.json(todos); // Send todos as JSON response
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos', error }); // Handle any errors
    }
};


export const addTodo = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Todo text is required' }); // Return a 400 if no text
    }

    try {
        const newTodo = new Todo({
            text: text,
            user: req.user._id,  // Use the user's ID from the token (req.user is available from auth middleware)
        });
        await newTodo.save(); // Save the new todo to the database
        res.json(newTodo); // Return the newly created todo
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ message: 'Error adding todo', error }); // Handle any errors
    }
};

// @desc    Delete a todo by ID
export const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id); // Delete todo by ID
        res.sendStatus(204); // Send no content status
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Error deleting todo', error }); // Handle any errors
    }
};
