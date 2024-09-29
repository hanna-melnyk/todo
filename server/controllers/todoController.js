// server/controllers/todoController.js
import { Todo } from '../models/TodoModel.js';

// Get all todos
export const getAllTodos = async (req, res) => {
    const { text, tags, strict } = req.query;

    try {
        // Step 1: Initialize the filter with the user condition
        const filter = { user: req.user._id };
        console.log('Initial filter:', JSON.stringify(filter, null, 2)); // Log initial filter state

        const conditions = []; // Array to hold all search conditions
        console.log('Initial conditions:', conditions); // Log initial conditions array

        // Log the strict parameter to see its effect
        console.log('Strict parameter value:', strict); // Log the strict parameter

        // Step 2: Add text search condition if provided
        if (text && text.trim()) {
            const regexPattern = text.trim();
            const textCondition = { text: { $regex: new RegExp(regexPattern, 'i') } }; // Use RegExp object directly
            conditions.push(textCondition); // Add to the conditions array
            console.log('Added textCondition to conditions:', JSON.stringify(textCondition, (key, value) => {
                return value instanceof RegExp ? value.toString() : value;
            }, 2)); // Convert RegExp to string for logging purposes
        } else {
            console.log('No text condition added. Text parameter was empty or undefined.');
        }

        // Step 3: Add tags search condition if provided
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const tagConditions = tagsArray.map(tag => ({ tags: { $regex: new RegExp(`^${tag}$`, 'i') } }));

            if (strict === 'true') {
                conditions.push(...tagConditions); // AND condition: Add all tag conditions separately
                console.log('Strict mode: Adding each tag condition separately to conditions:', tagConditions);
            } else {
                // In non-strict mode, use an OR condition for tags
                conditions.push({ $or: tagConditions });
                console.log('Non-strict mode: Adding OR condition for tags:', { $or: tagConditions });
            }
        } else {
            console.log('No tag condition added. Tags parameter was empty or undefined.');
        }

        // Step 4: Construct the final query filter based on conditions and `strict` parameter
        if (strict === 'true' && conditions.length > 0) {
            filter.$and = conditions; // Use $and if strict mode is enabled and conditions are present
            console.log('Constructed filter using $and in strict mode:', JSON.stringify(filter, (key, value) => {
                return value instanceof RegExp ? value.toString() : value;
            }, 2));
        } else if (conditions.length > 0) {
            filter.$or = conditions; // Use $or if non-strict mode or conditions are present
            console.log('Constructed filter using $or in non-strict mode:', JSON.stringify(filter, (key, value) => {
                return value instanceof RegExp ? value.toString() : value;
            }, 2));
        }

        console.log('Final filter before querying:', JSON.stringify(filter, (key, value) => {
            return value instanceof RegExp ? value.toString() : value;
        }, 2));


        // Step 5: Execute the query with the constructed filter
        const todos = await Todo.find(filter);
        console.log('Todos fetched:', todos.length, 'todos found.');
        res.json(todos);
    } catch (error) {
        console.error('Error in getAllTodos:', error);
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

// Update a todo (including text, completion status, and tags)
export const updateTodo = async (req, res) => {
    const { text, completed, tags } = req.body;  // Include tags in the update payload
    try {
        const updatedFields = { text, completed };

        // Update tags if provided in the request body
        if (tags) {
            updatedFields.tags = tags;
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            updatedFields,
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
