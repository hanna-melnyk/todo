// server/controllers/todoController.js
import { Todo } from '../models/TodoModel.js';

// Get all todos
export const getAllTodos = async (req, res) => {
    const { text, tags, strict } = req.query;

    try {
    const filter = { user: req.user._id };
    const conditions = []; // Array to store individual conditions for the query


    // Add text search condition if provided
    if (text) {
        conditions.push({ text: { $regex: text, $options: 'i' } });  // Case-insensitive regex search for text
    }

    // Add tags search condition if provided
    if (tags) {
        const tagsArray = tags.split(',');  // Split tags by comma to handle multiple tags
        conditions.push({ tags: { $in: tagsArray } });  // Match any of the provided tags
    }

    // Apply the appropriate query condition based on the `strict` parameter
    if (conditions.length > 0) {
        if (strict === 'true') {
            filter.$and = conditions;  // Strict (AND) condition: all conditions must be met
        } else {
            filter.$or = conditions;  // Non-strict (OR) condition: any condition can be met
        }
    }



        const todos = await Todo.find(filter); // Find todos for the logged-in user
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Add a new todo
export const addTodo = async (req, res) => {
    const { text, tags } = req.body;
    try {
        const newTodo = new Todo({
            text,
            user: req.user._id,
            completed: false,  // Default to not completed
            tags: tags || []
        });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error });
    }
};

// Update a todo (including completion status)
export const updateTodo = async (req, res) => {
    const { text, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { text, completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};
