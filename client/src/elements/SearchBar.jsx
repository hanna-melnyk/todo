//client/src/elements/SearchBar.jsx
import React, { useState } from 'react';
import { Box, Input, Button, HStack, FormControl, FormLabel, Switch } from '@chakra-ui/react';

// Define the SearchBar component
export const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');  // State for search text
    const [searchTags, setSearchTags] = useState('');  // State for search tags (comma separated)
    const [strictSearch, setStrictSearch] = useState(false);  // State for strict search toggle

    // Handle search button click
    const handleSearch = () => {
        // Pass the search parameters to the parent component through the onSearch callback
        onSearch({
            text: searchText,
            tags: searchTags,
            strict: strictSearch
        });
    };

    return (
        <Box mb={4}>
            <HStack spacing={2} mb={4}>
                <Input
                    placeholder="Search by text..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Input
                    placeholder="Search by tags (comma separated)..."
                    value={searchTags}
                    onChange={(e) => setSearchTags(e.target.value)}
                />
            </HStack>
            <HStack spacing={4} mb={4}>
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="strict-search" mb="0">
                        Strict Search (AND)
                    </FormLabel>
                    <Switch
                        id="strict-search"
                        isChecked={strictSearch}
                        onChange={(e) => setStrictSearch(e.target.checked)}
                    />
                </FormControl>
                <Button onClick={handleSearch} colorScheme="blue">Search</Button>
            </HStack>
        </Box>
    );
};

