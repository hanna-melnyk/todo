//client/src/elements/TodoList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/axiosTokenInterceptor';
import {
    Box, Button, Input, List, ListItem, Text, Checkbox, IconButton, useDisclosure, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, HStack, Tag, TagLabel
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useLogin } from '../contexts/LoginContext';
// import {SearchBar} from "./SearchBar.jsx";


/*TodoList element accepts the searchParams prop from TodoPage*/
export const TodoList = ({searchParams}) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newTags, setNewTags] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [error, setError] = useState(null);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control

    const { isLoggedIn, loading } = useLogin(); // Use isLoggedIn and loading from context


    // const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    // const isLoggedIn = !!storedUserInfo && !!storedUserInfo.token; // Check if logged in



    const fetchTodos = async (params = {}) => {
        try {
            const response = await authApi.get('/todos', { params: params });
            setTodos(response.data);
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                setError('Error fetching todos');
            }
            console.error(error);
        } finally {
            setLoadingTodos(false); // Stop loading todos
        }
    };


    // Wait until loading is done and isLoggedIn is not null
    useEffect(() => {
        if (!loading && isLoggedIn === false) {
            navigate('/login'); // Redirect if not logged in and loading is complete
        }
    }, [isLoggedIn, loading, navigate]);

    // Fetch todos when the component mounts or when searchParams change
    useEffect(() => {


        if (isLoggedIn) fetchTodos(searchParams);
    }, [authApi, isLoggedIn, navigate, searchParams]);

    // Add a new todo
    const addTodo = async () => {
        try {
            // Convert the comma-separated tags string into an array
            const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const response = await authApi.post('/todos', { text: newTodo, tags: tagsArray });
            setTodos([...todos, response.data]);
            setNewTodo('');
            setNewTags('');  // Clear the tags input after adding a todo
        } catch (error) {
            console.error('Error adding todo:', error);
            setError('Error adding todo');
        }
    };

    // Toggle todo completion status
    const toggleTodo = async (todo) => {
        try {
            const updatedTodo = { ...todo, completed: !todo.completed };
            await authApi.put(`/todos/${todo._id}`, updatedTodo);
            setTodos(todos.map(t => (t._id === todo._id ? updatedTodo : t)));
        } catch (error) {
            console.error('Error toggling todo:', error);
            setError('Error updating todo');
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await authApi.delete(`/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Error deleting todo');
        }
    };

    // Edit a todo (open modal)
    const handleEdit = (todo) => {
        setEditTodo(todo);  // Set the todo to be edited
        setNewTodo(todo.text);  // Set the input to the todo text
        onOpen();  // Open the modal for editing
    };

    // Save the edited todo
    const saveTodo = async () => {
        if (editTodo) {
            try {
                const updatedTodo = { ...editTodo, text: newTodo };
                await authApi.put(`/todos/${editTodo._id}`, updatedTodo);
                setTodos(todos.map(t => (t._id === editTodo._id ? updatedTodo : t)));
                setEditTodo(null);  // Clear the edit state
                setNewTodo('');  // Clear the input field
                onClose();  // Close the modal after saving
            } catch (error) {
                console.error('Error saving todo:', error);
                setError('Error saving todo');
            }
        }
    };

    // // Handle search criteria update from SearchBar component
    // const handleSearch = (searchParams) => {
    //     fetchTodos(searchParams);  // Fetch todos based on new search parameters
    // };

    // Conditional rendering based on error, loading, and todos length
    if (loading || loadingTodos) return <p>Loading...</p>; // Show loading state
    if (error) return <p>{error}</p>;

    return (
        <Box
            maxW="container.lg"
            mx="auto"
            pt={8}
            px={6}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="sm"
        >
            <Text fontSize="2xl" pb={4}>Todo List</Text>

            <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                pb={2}
            />

            <Input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Add tags (comma separated)"
                pb={4}
            />

            <Button onClick={addTodo} colorScheme="purple" width="full" pb={4}>Add Todo</Button>

            <List>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <ListItem key={todo._id} pb={2} display="flex" justifyContent="space-between" alignItems="center">
                            <HStack flex="1" spacing={5} onClick={() => toggleTodo(todo)} cursor="pointer">
                                <Checkbox
                                    isChecked={todo.completed}
                                    colorScheme="purple"
                                    pointerEvents="none"
                                    size="lg"
                                />
                                <Text
                                    textDecoration={todo.completed ? "line-through" : "none"}
                                    color={todo.completed ? "gray.500" : "black"}
                                    fontSize="lg"
                                >
                                    {todo.text}
                                </Text>
                            </HStack>

                            <HStack spacing={2} align="center">
                                {todo.tags && todo.tags.length > 0 && todo.tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        size="lg"
                                        variant="subtle"
                                        colorScheme="purple"
                                        borderRadius="md"
                                        px={4}
                                        py={1.5}
                                        height="32px"
                                    >
                                        <TagLabel fontSize="sm" fontWeight="medium">{tag}</TagLabel>
                                    </Tag>
                                ))}
                            </HStack>

                            <HStack spacing={2}>
                                <IconButton
                                    aria-label="Edit Todo"
                                    icon={<EditIcon />}
                                    colorScheme="gray"
                                    onClick={() => handleEdit(todo)}
                                />
                                <IconButton
                                    aria-label="Delete Todo"
                                    icon={<DeleteIcon />}
                                    colorScheme="red"
                                    onClick={() => deleteTodo(todo._id)}
                                />
                            </HStack>
                        </ListItem>
                    ))
                ) : (
                    <Text>No todos available</Text>
                )}
            </List>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalBody>
                        <Input
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Edit your todo"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={saveTodo}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
