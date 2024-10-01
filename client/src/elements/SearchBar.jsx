//client/src/elements/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    HStack,
    Text,
    Tag,
    TagLabel,
    TagRightIcon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    Icon,
    IconButton,
    Button,
    Checkbox,
    VStack,
    Divider
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon, DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { FiFilter } from "react-icons/fi";
import {FilterTag} from "./FilterTag.jsx";


/*todoFields object
*stores possible filter options for the `FilterTag` */
const todoFields = [
    { label: 'Todo Text', type: 'text', databaseName: 'text'}, // Maps to `text` field in the database
    { label: 'Tags', type: 'tags', databaseName: 'tags'}, // Maps to `tags` field in the database
    { label: 'Completed', type: 'checkbox', databaseName: 'completed'},  // Maps to `completed` field in the database
];



export const SearchBar = ({ onSearch, allTags }) => {
    const [filters, setFilters] = useState([]);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    // const filterMenuRef = useRef();
    const [tagsInFilterMenu, setTagsInFilterMenu] = useState([]);
    const [showFilters, setShowFilters] = useState(true); // State to show/hide the filter section


    useEffect(() => {
        // Update unique tags list based on existing filters
        const selectedTags = filters.filter((filter) => filter.type === 'tags').map((filter) => filter.value);
        const availableTags = allTags.filter((tag) => !selectedTags.includes(tag));
        setTagsInFilterMenu(availableTags);
    }, [allTags, filters]);

    // Automatically trigger search whenever filters change
    useEffect(() => {
        handleSearch(); // Trigger the search function automatically whenever a filter changes
    }, [filters]);


    // Function to add a new filter by selecting filter configuration from `todoFields` array
    const addFilter = (label) => {

        // Find the field configuration for the selected filter type
        const fieldConfig = todoFields.find(todoField => todoField.label === label);
        // Ensure a valid field configuration is found
        if (!fieldConfig) return;

        // Add the filter using the type and corresponding field label from the configuration
        setFilters([...filters, { label: fieldConfig.label, type: fieldConfig.type, name: fieldConfig.databaseName, value: '' }]);
        setFilterMenuOpen(false);
    };

    const updateFilterValue = (index, value) => {
        const updatedFilters = filters.map((filter, i) => (i === index ? { ...filter, value } : filter));
        setFilters(updatedFilters);
    };

    const removeFilter = (index) => {
        const updatedFilters = filters.filter((_, i) => i !== index);
        setFilters(updatedFilters);
    };

    const resetFilters = () => {
        setFilters([]);  // Clear all filters
        onSearch({});  // Reset search parameters in the parent component
    };

    // Trigger search by calling onSearch with filter values
    const handleSearch = () => {
        const searchParams = {};
        filters.forEach((filter) => {
            if (filter.value.trim()) {
                if (filter.type.toLowerCase() === 'tags') {
                    // Convert and format tags correctly
                    searchParams[filter.type.toLowerCase()] = filter.value
                        .split(',')
                        .map(tag => tag.trim())  // Normalize: trim
                        .filter(tag => tag)                   // Remove any empty tags
                        .join(', ');                          // Join into a cleaned comma-separated string
                } else if(filter.type.toLowerCase() === 'checkbox') {
                    // Convert `Checked` to `true` and `Unchecked` to `false`
                    const normalizedValue = filter.value === 'Checked' ? true : filter.value === 'Unchecked' ? false : undefined;
                    if (normalizedValue !== undefined) {
                        // Include the field name (e.g., "completed: true")
                        searchParams[filter.name] = normalizedValue;
                    }
                } else {
                    searchParams[filter.type.toLowerCase()] = filter.value.trim();
                }
            }
        });

        // Developer log: log the final search parameters before calling onSearch
        console.log("Search Parameters:", searchParams);
        onSearch(searchParams);  // Call the parent's search handler
    };

    return (
        <Box w="100%" p={2} position="relative">
            {/* Title Section with Filter Toggle Button */}
            <HStack justifyContent="space-between" mb={2}>
                <Text fontSize="2xl" fontWeight="bold">Todos</Text>
                <IconButton
                    icon={<FiFilter />}  // Use the filter icon
                    aria-label="Toggle Filters"
                    onClick={() => setShowFilters(!showFilters)}  // Toggle show/hide filters
                    variant="ghost"
                    colorScheme="purple"
                    size="md"
                />
            </HStack>
            {/* Divider Line */}
            <Divider mb={4} />


            {/* Conditional Rendering of Filter Section */}
            {showFilters && (
                <>
                    {/* Filter Section */}
                    <HStack p={2} spacing={3}>
                        {filters.map((filter, index) => (
                            <FilterTag
                                key={index}
                                type={filter.type}
                                value={filter.value}
                                name={filter.name}
                                allTags={allTags} //pass allTags rom SearchBar to FilterTag
                                onValueChange={(value) => updateFilterValue(index, value)}
                                onDelete={() => removeFilter(index)}
                            />
                        ))}


                        <Box position="relative" display="inline-block">
                            {/* Add Filter Button */}
                            <Button
                                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                                leftIcon={<AddIcon />}
                                variant="ghost"
                                color="gray.600"
                                borderRadius="md"
                                _hover={{ bg: 'gray.100' }}
                                size="sm"
                                px={4}
                                py={2}
                                bg="transparent"
                                boxShadow="none"
                            >
                                Add Filter
                            </Button>
                            {filterMenuOpen && (
                                <Box
                                    position="absolute"
                                    top="100%"
                                    mt={2}
                                    zIndex={1}
                                    bg="white"
                                    border="1px solid #E2E8F0"
                                    boxShadow="md"
                                    borderRadius="md"
                                    width="200px"
                                    p={2}
                                >
                                    <Text fontSize="sm" color="gray.600" mb={2}>
                                        Choose filter
                                    </Text>

                                    {todoFields.map((field, index) => (
                                        <Box key={index} onClick={() => addFilter(field.label)} p={2} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                                            {field.label}
                                        </Box>
                                    ))}

                                </Box>
                            )}
                        </Box>

                        {/* Reset Filter Button */}
                        <Box position="relative" display="inline-block" marginLeft="auto">
                            <Button
                                onClick={resetFilters}
                                colorScheme="red"
                                variant="outline"
                                borderRadius="md"
                                borderStyle="dashed"  // Apply dashed border style
                                _hover={{ bg: 'red.100' }}
                                size="sm"
                                px={4}
                                py={2}
                            >
                                Reset Filters
                            </Button>
                        </Box>
                    </HStack>
                </>
                )}
        </Box>
    );
};
