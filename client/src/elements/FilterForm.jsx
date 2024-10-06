// client/src/elements/FilterForm.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Text, useColorMode } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FilterTag } from './FilterTag.jsx';
import {getTransparentContainerStyle, getSolidContainerStyle, getMenuItemHoverStyle} from "../theme-helper.js";

const todoFields = [
    { label: 'Todo Text', type: 'text', databaseName: 'text' },
    { label: 'Tags', type: 'tags', databaseName: 'tags' },
    { label: 'Completed', type: 'checkbox', databaseName: 'completed' },
];

export const FilterForm = ({ allTags, onSearch }) => {
    const [filters, setFilters] = useState([]);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [tagsInFilterMenu, setTagsInFilterMenu] = useState([]);
    const {colorMode} = useColorMode(); // Use `useColorMode` to get the current color mode

    useEffect(() => {
        const selectedTags = filters.filter((filter) => filter.type === 'tags').map((filter) => filter.value);
        const availableTags = allTags.filter((tag) => !selectedTags.includes(tag));
        setTagsInFilterMenu(availableTags);
    }, [allTags, filters]);

    useEffect(() => {
        handleSearch();
    }, [filters]);

    const addFilter = (label) => {
        const fieldConfig = todoFields.find((todoField) => todoField.label === label);
        if (!fieldConfig) return;
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
        setFilters([]);
        onSearch({});
    };

    const handleSearch = () => {
        const searchParams = {};
        filters.forEach((filter) => {
            if (filter.value.trim()) {
                if (filter.type.toLowerCase() === 'tags') {
                    searchParams[filter.type.toLowerCase()] = filter.value
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter((tag) => tag)
                        .join(', ');
                } else if (filter.type.toLowerCase() === 'checkbox') {
                    const normalizedValue = filter.value === 'Checked' ? true : filter.value === 'Unchecked' ? false : undefined;
                    if (normalizedValue !== undefined) {
                        searchParams[filter.name] = normalizedValue;
                    }
                } else {
                    searchParams[filter.type.toLowerCase()] = filter.value.trim();
                }
            }
        });
        onSearch(searchParams);
    };

    return (
        <Box {...getTransparentContainerStyle(colorMode)}>
            <HStack p={2} spacing={3}>
                {filters.map((filter, index) => (
                    <FilterTag
                        key={index}
                        type={filter.type}
                        value={filter.value}
                        name={filter.name}
                        allTags={allTags}
                        onValueChange={(value) => updateFilterValue(index, value)}
                        onDelete={() => removeFilter(index)}
                    />
                ))}
                <Box position="relative" display="inline-block">
                    <Button
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                        leftIcon={<AddIcon />}
                        colorScheme="gray"
                        borderRadius="md"

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
                            {...getSolidContainerStyle(colorMode)}
                            width="200px"
                            p={2}
                        >
                            <Text fontSize="sm" color="gray.600" mb={2}>
                                Choose filter
                            </Text>
                            {todoFields.map((field, index) => (
                                <Box
                                    key={index}
                                    onClick={() => addFilter(field.label)}
                                    p={2}
                                    cursor="pointer"
                                    _hover={getMenuItemHoverStyle(colorMode)}
                                >
                                    {field.label}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
                <Box position="relative" display="inline-block" marginLeft="auto">
                    <Button
                        onClick={resetFilters}
                        colorScheme="red"
                        variant="outline"
                        borderRadius="md"
                        borderStyle="dashed"
                        _hover={{ bg: 'red.100' }}
                        size="sm"
                        px={4}
                        py={2}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </HStack>
        </Box>
    );
};
