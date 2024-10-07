import React, { useState, useEffect, useRef } from 'react';
import {Box, Button, Input, HStack, Tag, TagLabel, useOutsideClick, useColorMode} from '@chakra-ui/react';
import {getTransparentContainerStyle} from "../theme-helper.js";

/**
 * NewTodoForm Component
 * @param {Object} props
 * @param {Function} props.addTodo - Function to save the new todo
 * @param {Function} props.onCancel - Function to cancel the new todo addition
 * @param {Array} props.allTags - Array of all available tags for the dropdown
 */
export const NewTodoForm = ({ addTodo, onCancel, allTags }) => {
    const [todoName, setTodoName] = useState('');
    const [tags, setTags] = useState('');
    const [filteredTags, setFilteredTags] = useState([]); // State to hold filtered tag suggestions
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const { colorMode } = useColorMode(); // Use `useColorMode` to get the current color mode

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Automatically focus on the first input field when form appears
        }
    }, []);

    // Handle tag input changes and filter tag suggestions
    useEffect(() => {
        if (tags) {
            const searchValue = tags.split(',').pop().trim(); // Get the latest value after the last comma
            const selectedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''); // Get existing tags
            setFilteredTags(
                allTags
                    .filter(tag => tag.toLowerCase().includes(searchValue.toLowerCase())) // Match with input
                    .filter(tag => !selectedTags.includes(tag)) // Exclude selected tags
            );
        } else {
            setFilteredTags([]);
        }
    }, [tags, allTags]);

    // Update the input field when a tag is clicked
    const handleTagClick = (tag, event) => {
        event.stopPropagation(); // Prevent click event from propagating
        const tagsArray = tags.split(',').map(tag => tag.trim());
        tagsArray[tagsArray.length - 1] = tag; // Replace the last fragment with the selected tag
        const updatedTags = tagsArray.filter(t => t !== '').join(', ') + ', '; // Join and add a comma
        setTags(updatedTags);
        setFilteredTags([]); // Hide the dropdown after selecting a tag
        inputRef.current.focus(); // Keep focus on the input field
    };

    useOutsideClick({
        ref: menuRef,
        handler: () => setFilteredTags([]),
    });

    return (
        <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            mt={2}
            {...getTransparentContainerStyle(colorMode)}
        >
            {/* Input field for Todo Name */}
            <Input
                type="text"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                placeholder="Add a new todo"
                mb={2}
                borderColor="#9B979A"
                focusBorderColor="#7D44EE" // Change border color on focus
                _hover={{ borderColor: "gray.500" }}
                ref={inputRef} // Attach ref to focus automatically
            />

            {/* Input field for Tags */}
            <Input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags (comma separated)"
                mb={4}
                borderColor="#9B979A"
                focusBorderColor="#7D44EE" // Change border color on focus
                _hover={{ borderColor: "gray.500" }}
            />

            {/* Dropdown Tag Suggestions */}
            <Box position="relative">
                {filteredTags.length > 0 && (
                    <Box
                        ref={menuRef} // Attach ref to the dropdown menu container
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
                                _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}
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

            {/* Button to save or cancel */}
            <Button
                mr={2}
                onClick={() => addTodo(todoName, tags, setTodoName, setTags)} // Pass values to the parent save handler
            >
                Save
            </Button>
            <Button
                variant="outline"
                onClick={onCancel}
                borderColor="#9B979A"
                _hover={{ borderColor: "gray.500" }}
            >
                Cancel
            </Button>
        </Box>
    );
};

