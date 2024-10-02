// client/src/elements/TodoPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Divider, Container, Center, useColorMode, HStack, VStack, Flex  } from '@chakra-ui/react';
import { SearchBar } from './SearchBar.jsx';
import { TodoList } from './TodoList.jsx';
import {getTransparentContainerStyle} from "../theme-helper.js";
import {NewButton} from "./NewButton.jsx";
import {FilterButton} from "./FilterButton.jsx";
import {NewTodoForm} from "./NewTodoForm.jsx";
import {FilterForm} from "./FilterForm.jsx";
import authApi from "../api/axiosTokenInterceptor.js";

export const TodoPage = () => {
    const [searchParams, setSearchParams] = useState({});  // State to hold search parameters
    /*Setting searchParams in TodoPage ensures correct parent-child communication:
    * TodoPage element contains SearchBar and the TodoList components.
    * it passes down the search criteria to both components (SearchBar for handling user inputs and TodoList for fetching and displaying filtered data).
    * "Top-Down Data Flow": parent component manages the state and passes down data or functions as props.*/
    const [allTags, setAllTags] = useState([]);  // State to hold all tags for shared use
    const { colorMode } = useColorMode(); // Use `useColorMode` to get the current color mode


    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showTodoForm, setShowTodoForm] = useState(false);
    const [todos, setTodos] = useState([]);  // Central state for todos
    const [error, setError] = useState('');  // State for managing error messages

    // Add a new todo
    const addTodo = async (todoName, tags, resetTodoName, resetTags) => {
        if (!todoName.trim()) {
            setError('Todo text cannot be empty.'); // Set error if input is empty
            return;
        }

        try {
            // Convert the comma-separated tags string into an array
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const response = await authApi.post('/todos', { text: todoName, tags: tagsArray });
            setTodos([...todos, response.data]);

            // Update the `allTags` list in the parent (`TodoPage`) with the new tags
            const uniqueTags = [...new Set([...allTags, ...tagsArray])];  // Keep the tags in their original case
            setAllTags(uniqueTags);  // Call the `setAllTags` function from the parent component

            // Reset input fields and hide form
            // setTodoName('');
            // setTags('');  // Clear the tags input after adding a todo
            resetTodoName('');
            resetTags('');
            setShowTodoForm(false);
            setError(''); // Clear error after successful addition
        } catch (error) {
            console.error('Error adding todo:', error);
            setError('Error adding todo');
        }
    };


/*useEffect for debugging purposes*/
    useEffect(() => {
        console.log("Updated All Tags in TodoPage:", allTags);  // Log updated tags in `TodoPage`
    }, [allTags]);



    // Define the search handler
    const handleSearch = (params) => {
        setSearchParams(params);  // Update search params when search is performed
    };

    return (
        <Box display="flex">
            {/* Vertical Stack for all elements */}
            <VStack maxW="container.lg" mx="auto">
                {/* Button Container */}

                {/* Button Container with Flex Component */}
                <Flex w="100%" justifyContent="space-between" mb={4} alignItems="center">
                    {/* NewButton with Margin Top Adjustment */}
                    <Box>
                        <NewButton showTodoForm={showTodoForm} setShowTodoForm={setShowTodoForm} mt="5px" />
                    </Box>

                    {/* FilterButton */}
                    <Box>
                        <FilterButton toggleFilter={() => setShowFilterForm(!showFilterForm)} showFilterForm={showFilterForm} />
                    </Box>
                </Flex>


                {/* Forms Container (appear below buttons) */}
                <VStack w="100%">
                    {/* NewTodoForm Container */}
                    {showTodoForm && (
                        <Box
                            w="100%"
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            {...getTransparentContainerStyle(colorMode)}
                        >
                            <NewTodoForm
                                addTodo={addTodo}
                                onCancel={() => setShowTodoForm(false)}
                                allTags={allTags}
                            />
                        </Box>
                    )}

                    {/* FilterForm Container */}
                    {showFilterForm && (
                        <Box
                            w="100%"
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            {...getTransparentContainerStyle(colorMode)}
                        >
                            <FilterForm
                                allTags={allTags}
                                onSearch={handleSearch}
                                colorMode={colorMode}
                            />
                        </Box>
                    )}
                </VStack>

                {/* TodoList Container */}
                <Box w="100%">
                    <Center>
                        <TodoList
                            searchParams={searchParams}
                            setAllTags={setAllTags}
                            allTags={allTags}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    </Center>
                </Box>
            </VStack>
        </Box>
    );
};
