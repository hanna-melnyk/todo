//client/src/elements/TodoList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAxiosInterceptor} from "../api/axiosTokenInterceptor.js";
import { AuthContext } from '../context/AuthContext';

export const TodoList = () => {
    const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
    const authApi = useAxiosInterceptor();
    const [todos, setTodos] = useState([]); // Initialize with an empty array
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState(null); // Add error state
    const [loading, setLoading] = useState(true); // Add loading state
    const [isSelected, setIsSelected] = React.useState(false);
    const navigate = useNavigate();


    // If the user is not logged in, redirect to the login page
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // Fetch todos when the component mounts
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await authApi.get('/todos'); // Axios authApi automatically attaches the token
                setTodos(response.data); // Set the fetched todos
                setError(null); // Clear any previous errors
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching todos');
                }
                console.error('Error fetching todos:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        // Only fetch todos if the user is logged in
        if (isLoggedIn) {
            fetchTodos();
        }
    }, [authApi, navigate, isLoggedIn]);




    // Add a new todo
    const addTodo = async () => {
        try {
            const response = await authApi.post('/todos', { text: newTodo }); // changed from '/api/todos'
            setTodos([...todos, response.data]); // Add the new todo to the list
            setNewTodo(''); // Clear the input field
        } catch (error) {
            console.error('Error adding todo:', error);
            setError('Error adding todo');
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await authApi.delete(`/todos/${id}`); // changed from '/api/todos'
            setTodos(todos.filter(todo => todo._id !== id)); // Remove the deleted todo from the list
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Error deleting todo');
        }
    };

    // Conditional rendering based on error, loading, and todos length
    if (loading) {
        return <p>Loading todos...</p>; // Display loading state
    }

    if (error) {
        return <p>{error}</p>; // Display error message
    }

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add Todo</button>

            <ul>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <li key={todo._id}>
                            {todo.text}
                            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No todos available</p> // Display message if there are no todos
                )}
            </ul>
        </div>
    );
};

