//server/models/TodoModel.js
import mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

export const Todo = mongoose.model('Todo', TodoSchema);