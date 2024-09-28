//client/src/elements/TodoList.jsx
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/axiosTokenInterceptor';
import {
    Box, Button, Input, List, ListItem, Text, Checkbox, IconButton, useDisclosure, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, HStack, Tag, TagLabel,
    Alert, AlertIcon, AlertTitle, AlertDescription, useOutsideClick
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useLogin } from '../contexts/LoginContext';


/*TodoList element accepts the searchParams prop from TodoPage*/
export const TodoList = ({searchParams}) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newTags, setNewTags] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [error, setError] = useState(null);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const [allTags, setAllTags] = useState([]); // State to hold all existing tags
    const [filteredTags, setFilteredTags] = useState([]); // Filtered tag suggestions
    const menuRef = useRef(); // Ref to handle outside click for tag suggestions
    const inputRef = useRef(); // New input ref for the tag input
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();  // useDisclosure for modal control
    const { isLoggedIn, loading } = useLogin(); // Use isLoggedIn and loading from context


    const fetchTodos = async (params = {}) => {
        try {
            const response = await authApi.get('/todos', { params: params });
            setTodos(response.data);
            setAllTags([...new Set(response.data.flatMap(todo => todo.tags))]); // Extract unique tags
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
        if (!newTodo.trim()) {
            setError('Todo text cannot be empty.'); // Set error if input is empty
            return;
        }

        try {
            // Convert the comma-separated tags string into an array
            const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const response = await authApi.post('/todos', { text: newTodo, tags: tagsArray });
            setTodos([...todos, response.data]);
            setNewTodo('');
            setNewTags('');  // Clear the tags input after adding a todo
            setError(''); // Clear error after successful addition
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
        setNewTags(todo.tags.join(', ')); // Set the input for the existing tags
        onOpen();  // Open the modal for editing
    };

    // Function to handle cancel button click in modal
    const handleCancel = () => {
        setEditTodo(null);  // Clear the edit state
        setNewTodo('');  // Reset the text input field
        setNewTags('');  // Reset the tags input field
        onClose();  // Close the modal
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

    // Filter tags based on input and exclude already selected tags
    useEffect(() => {
        if (newTags) {
            const searchValue = newTags.split(',').pop().trim();
            const selectedTags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''); // Get existing tags
            setFilteredTags(
                allTags
                    .filter(tag => tag.toLowerCase().includes(searchValue.toLowerCase())) // Match with input
                    .filter(tag => !selectedTags.includes(tag)) // Exclude selected tags
            );
        } else {
            setFilteredTags([]);
        }
    }, [newTags, allTags]);

    // Update the input field when a tag is clicked
    const handleTagClick = (tag, event) => {
        event.stopPropagation(); // Prevent click event from propagating
        console.log("Tag Clicked:", tag); // Log the clicked tag
        // Split the current input by commas to handle multiple tags
        const tagsArray = newTags.split(',').map(tag => tag.trim());
        console.log("Before Update:", tagsArray); // Log the state before updating
        // Replace the last fragment with the selected tag
        tagsArray[tagsArray.length - 1] = tag;
        // Join the updated tags and add a comma
        const updatedTags = tagsArray.filter(t => t !== '').join(', ') + ', ';
        console.log("After Update:", updatedTags); // Log the updated tags string
        setNewTags(updatedTags);
        setFilteredTags([]);
        inputRef.current.focus(); // Keep focus on the input field
    };

    useOutsideClick({
        ref: menuRef,
        handler: () => setFilteredTags([]),
    });


    // Conditional rendering based on error, loading, and todos length
    if (loading || loadingTodos) return <p>Loading...</p>; // Show loading state
    // if (error) return <p>{error}</p>;

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

            {error === 'Todo text cannot be empty.' && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    <AlertTitle>Error:</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                pb={2}
            />

            <Input
                ref={inputRef} // Attach ref to the input
                type="text"
                value={newTags}
                onChange={(e) => {
                    console.log("Current New Tags Input:", e.target.value); // Log the input value on change
                    setNewTags(e.target.value);
                }}
                placeholder="Add tags (comma separated)"
                pb={4}
            />
            <Box position="relative">
                {filteredTags.length > 0 && (
                    <Box
                        ref={menuRef} // Attach the ref to the dropdown menu container
                        maxH="200px"
                        overflowY="scroll"
                        position="absolute"
                        top="100%"
                        zIndex={1}
                        boxShadow="md"
                        bg="white"
                        border="1px solid #E2E8F0"
                        width="100%"
                    >
                        {filteredTags.map((tag, index) => (
                            <HStack
                                key={index}
                                onClick={(event) => handleTagClick(tag, event)}
                                _hover={{ cursor: 'pointer' }}
                                p={1}
                            >
                                <Tag
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
                            </HStack>
                        ))}
                    </Box>
                )}
            </Box>


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

                            <HStack spacing={2} px={2} align="center">
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

            {/* Combined Modal for Editing Text and Tags */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalBody>
                        <Input
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Edit your todo text"
                            mb={4}
                        />
                        <Input
                            value={newTags}
                            onChange={(e) => setNewTags(e.target.value)}
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
