// client/src/elements/TodoPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Divider, Container, Center } from '@chakra-ui/react';
import { SearchBar } from './SearchBar.jsx';
import { TodoList } from './TodoList.jsx';

export const TodoPage = () => {
    const [searchParams, setSearchParams] = useState({});  // State to hold search parameters
    /*Setting searchParams in TodoPage ensures correct parent-child communication:
    * TodoPage element contains SearchBar and the TodoList components.
    * it passes down the search criteria to both components (SearchBar for handling user inputs and TodoList for fetching and displaying filtered data).
    * "Top-Down Data Flow": parent component manages the state and passes down data or functions as props.*/
    const [allTags, setAllTags] = useState([]);  // State to hold all tags for shared use

/*useEffect for debugging purposes*/
    useEffect(() => {
        console.log("Updated All Tags in TodoPage:", allTags);  // Log updated tags in `TodoPage`
    }, [allTags]);



    // Define the search handler
    const handleSearch = (params) => {
        setSearchParams(params);  // Update search params when search is performed
    };

    return (
        <Box w="100vw" overflowX="hidden">
            {/* SearchBar Container with Full Viewport Width */}
            <Box w="100vw" bg="transparent" boxShadow="sm">
                {/* Centered SearchBar inside the Container */}
                <Center>
                    <Container maxW="container.lg" w="100vw" p={4} bg="white" boxShadow="md" borderRadius="md">
                        {/* Pass handleSearch to the SearchBar as onSearch prop */}
                        <SearchBar onSearch={handleSearch} allTags={allTags} />
                    </Container>
                </Center>
            </Box>

            {/* TodoList Section */}
            <Container
                maxW="container.lg"
                w="100vw"
                my={4}
                bg="transparent"
                boxShadow="md"
                borderRadius="md"
            >
                {/* Pass search parameters and setAllTags function */}
                <TodoList searchParams={searchParams} setAllTags={setAllTags} allTags={allTags} />
            </Container>
        </Box>
    );
};
