//client/src/elements/TodoList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAxiosInterceptor} from "../api/axiosTokenInterceptor.js";
import { AuthContext } from '../context/AuthContext';
import { Box, Button, Input, List, ListItem, Text, Checkbox, IconButton, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export const TodoList = () => {
    const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
    const authApi = useAxiosInterceptor();
    const [todos, setTodos] = useState([]); // Initialize with an empty array
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState(null); // Add error state
    const [loading, setLoading] = useState(true); // Add loading state
    const [isSelected, setIsSelected] = React.useState(false);
    const navigate = useNavigate();
    // useDisclosure hook manages the open/close state of components, typically used for modal, drawer, etc.
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    // Toggle todo completion status
    const toggleTodo = async (todo) => {
        try {
            const updatedTodo = { ...todo, completed: !todo.completed }; // Toggle completion status
            await authApi.put(`/todos/${todo._id}`, updatedTodo); // Update on the server
            setTodos(todos.map(t => (t._id === todo._id ? updatedTodo : t))); // Update local state
        } catch (error) {
            console.error('Error toggling todo:', error);
            setError('Error updating todo');
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

    // Edit a todo
    const handleEdit = (todo) => {
        setEditTodo(todo);  // Set the todo to be edited
        setNewTodo(todo.text);  // Set the input to the todo text
        onOpen();  // Open the edit modal/input field (sets isOpen to true)
    };

    // Save the edited todo
    const saveTodo = async () => {
        if (editTodo) {
            try {
                const updatedTodo = { ...editTodo, text: newTodo };  // Update the text of the todo
                await authApi.put(`/todos/${editTodo._id}`, updatedTodo);  // Save the updated todo on the server
                setTodos(todos.map(t => (t._id === editTodo._id ? updatedTodo : t)));  // Update the local state
                setEditTodo(null);  // Clear the edit state
                setNewTodo('');  // Clear the input field
                onClose();  // Close the modal/input field (sets isOpen to false)
            } catch (error) {
                console.error('Error saving todo:', error);
                setError('Error saving todo');
            }
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
        <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="2xl" mb={4}>Todo List</Text>
            <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                mb={4}
            />
            <Button onClick={editTodo ? saveTodo : addTodo} colorScheme="teal" width="full" mb={4}>
                {editTodo ? 'Save Todo' : 'Add Todo'}
            </Button>
            <List>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <ListItem key={todo._id} mb={2} display="flex" justifyContent="space-between" alignItems="center">
                            <Checkbox
                                isChecked={todo.completed}
                                onChange={() => toggleTodo(todo)}
                                colorScheme="teal"
                                mr={4}
                            >
                                {todo.text}
                            </Checkbox>
                            <IconButton
                                aria-label="Edit Todo"
                                icon={<EditIcon />}
                                colorScheme="yellow"
                                onClick={() => handleEdit(todo)}
                                mr={2}
                            />
                            <IconButton
                                aria-label="Delete Todo"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                onClick={() => deleteTodo(todo._id)}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Text>No todos available</Text>
                )}
            </List>
        </Box>
    );
};

