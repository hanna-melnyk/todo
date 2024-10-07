//client/src/elements/TodoList.jsx
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/axiosTokenInterceptor';
import {
    Box, Button, ButtonGroup, Input, List, ListItem, Text, Checkbox, IconButton, useDisclosure, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, HStack, Tag, TagLabel,
    Alert, AlertIcon, AlertTitle, AlertDescription, useOutsideClick, useColorMode
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { useLogin } from '../contexts/LoginContext';
import {getTransparentWhiteContainerStyle} from "../theme-helper.js";
import {fetchTodosRequest, updateTodoRequest, deleteTodoRequest, toggleTodoRequest } from "../api/requestService.js";


/*TodoList element accepts the searchParams prop from TodoPage*/
export const TodoList = ({ todos, setTodos, searchParams, setAllTags, allTags }) => {
    const [editTodo, setEditTodo] = useState(null);
    const [error, setError] = useState(null);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control
    const { isLoggedIn, loading } = useLogin(); // Use isLoggedIn and loading from context
    /*Separate states for "Add Todo" and "Edit Todo"*/
    const [editTodoName, setEditTodoName] = useState('');
    const [editTags, setEditTags] = useState('');
    const { colorMode } = useColorMode(); // Use `useColorMode` to get the current color mode

    const fetchTodos = async (params = {}) => {
        try {
            /*Developer log to see params*/
            console.log("Fetching todos with params:", params);
            const response = await fetchTodosRequest(params);
            const todos = response.data;
            console.log("Todos received:", todos);  // Log todos received
            setTodos(todos);

            // Extract unique tags and update the parent `allTags`
            const uniqueTags = [...new Set(todos.flatMap(todo => todo.tags))];
            setAllTags(uniqueTags); // Call the `setAllTags` prop passed from `TodoPage`
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



    // Toggle todo completion status
    const toggleTodo = async (todo) => {
        try {
            const updatedCompletedStatus = !todo.completed;
            await toggleTodoRequest(todo._id, updatedCompletedStatus); // Only update the `completed` field
            setTodos(todos.map(t => (t._id === todo._id ? { ...t, completed: updatedCompletedStatus } : t)));
        } catch (error) {
            console.error('Error toggling todo:', error);
            setError('Error updating todo');
        }
    };

    // Delete a todo
    const handleDelete = async (id) => {
        try {
            await deleteTodoRequest(id);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Error deleting todo');
        }
    };

    // Edit a todo (open modal)
    const handleEdit = (todo) => {
        setEditTodo(todo);
        setEditTodoName(todo.text);
        setEditTags(todo.tags.join(', '));
        onOpen();
    };

    // Function to handle cancel button click in modal
    const handleCancel = () => {
        setEditTodo(null);  // Clear the edit state
        setEditTodoName('');  // Reset the text input field
        setEditTags('');  // Reset the tags input field
        onClose();  // Close the modal
    };



    // Save the edited todo
    const saveTodo = async () => {
        if (editTodo) {
            try {
                const tagsArray = editTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                const updatedTodo = { ...editTodo, text: editTodoName, tags: tagsArray };
                await authApi.put(`/todos/${editTodo._id}`, updatedTodo);
                setTodos(todos.map(t => (t._id === editTodo._id ? updatedTodo : t)));

                // Update allTags with the new and existing tags
                const uniqueTags = [...new Set([...allTags, ...tagsArray])];
                setAllTags(uniqueTags);  // Update the global tag list immediately
                setEditTodo(null);
                setEditTodoName('');
                setEditTags('');
                onClose();  // Close the modal after saving
            } catch (error) {
                console.error('Error saving todo:', error);
                setError('Error saving todo');
            }
        }
    };


    // Update the input field when a tag is clicked
    const handleTagClick = (tag, event) => {
        event.stopPropagation(); // Prevent click event from propagating
        console.log("Tag Clicked:", tag); // Log the clicked tag
        // Split the current input by commas to handle multiple tags
        const tagsArray = tags.split(',').map(tag => tag.trim());
        console.log("Before Update:", tagsArray); // Log the state before updating
        // Replace the last fragment with the selected tag
        tagsArray[tagsArray.length - 1] = tag;
        // Join the updated tags and add a comma
        const updatedTags = tagsArray.filter(t => t !== '').join(', ') + ', ';
        console.log("After Update:", updatedTags); // Log the updated tags string
        setTags(updatedTags);
        setFilteredTags([]);
        inputRef.current.focus(); // Keep focus on the input field
    };


    // Conditional rendering based on error, loading, and todos length
    if (loading || loadingTodos) return <p>Loading...</p>; // Show loading state


    return (
        <Box
            maxW="container.lg"
            borderRadius="lg"
            bg="transparent"
        >

            {/* Display the list of todos */}
            <List>
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <ListItem
                            key={todo._id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            {...getTransparentWhiteContainerStyle(colorMode)} // Pass colorMode to getListItemStyles
                        >
                            <HStack flex="1" spacing={5} onClick={() => toggleTodo(todo)} cursor="pointer">
                                <Checkbox
                                    isChecked={todo.completed}
                                    colorScheme="none" // Remove default Chakra color scheme
                                    borderColor="#5316C4"
                                    _checked={{
                                        borderColor: "#5316C4", // When checked, set the border color to match outline color
                                        bg: "#5316C4", // Set background color when checked
                                        color: "white", // Color of the checkmark icon (if iconColor is not used)
                                    }}
                                    pointerEvents="none"
                                    size="lg"
                                />
                                <Text
                                    textDecoration={todo.completed ? "line-through" : "none"}
                                    color={colorMode === "dark" ? "gray.300" : "black"}
                                    fontSize="lg"
                                >
                                    {todo.text}
                                </Text>
                            </HStack>

                            <HStack spacing={2} px={2} align="center">
                                {todo.tags && todo.tags.length > 0 && todo.tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        size="lg"
                                        variant="subtle"
                                        colorScheme="purple"
                                        borderRadius="md"
                                        px={1}
                                        // py={0.5}
                                        // height="15px"
                                    >
                                        <TagLabel fontSize="md" fontWeight="medium">{tag}</TagLabel>
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
                                    colorScheme="gray"
                                    onClick={() => handleDelete(todo._id)}
                                />
                            </HStack>
                        </ListItem>
                    ))
                ) : (
                    <Text>No todos available</Text>
                )}
            </List>

            {/* Combined Modal for Editing Text and Tags */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalBody>
                        <Input
                            value={editTodoName}
                            onChange={(e) => setEditTodoName(e.target.value)}
                            placeholder="Edit your todo text"
                            mb={4}
                        />
                        <Input
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            placeholder="Edit tags (comma separated)"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={saveTodo}>
                            Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
