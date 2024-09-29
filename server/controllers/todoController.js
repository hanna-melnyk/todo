// server/controllers/todoController.js
import { Todo } from '../models/TodoModel.js';

// Get all todos
export const getAllTodos = async (req, res) => {
    const { text, tags, strict } = req.query;

    try {
        const filter = { user: req.user._id };
        let conditions = []; // Array to store individual conditions for the query

        // Add text search condition if provided
        if (text) {
            conditions.push({ text: { $regex: text, $options: 'i' } });  // Case-insensitive regex search for text
        }

        // Add tags search condition if provided
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());  // Split tags by comma to handle multiple tags

            // Create case-insensitive regex conditions for each tag using `^` and `$` to match exact tags
            const tagConditions = tagsArray.map(tag => ({ tags: { $regex: new RegExp(`^${tag}$`, 'i') } }));

            // Determine AND or OR condition based on the `strict` parameter
            if (strict === 'true') {
                // Use AND condition: all tags must be present
                conditions = [...conditions, ...tagConditions];
            } else {
                // Use OR condition: match any of the provided tags
                if (tagConditions.length > 0) {
                    filter.$or = tagConditions;  // Directly assign `$or` to `filter`
                }
            }
        }

        // Apply the appropriate query condition based on the `conditions` array
        if (strict === 'true' && conditions.length > 0) {
            filter.$and = conditions;  // Use AND only if strict is true
        }

        console.log('from getAllTodos(): filter:', JSON.stringify(filter, null, 2));

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
