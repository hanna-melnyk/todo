import React, { useState, useRef } from 'react';
import {
    Box,
    Input,
    HStack,
    Text,
    Icon,
    Tag,
    TagLabel,
    TagRightIcon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';
import { ChevronDownIcon, AddIcon, DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { GoKebabHorizontal } from 'react-icons/go';

const FilterTag = ({ type, value, onValueChange, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuValue, setMenuValue] = useState(value);

    return (
        <Box position="relative" display="inline-block">
            <Tag size="lg" borderRadius="full" variant="subtle" colorScheme="blue" cursor="pointer" onClick={() => setShowMenu(!showMenu)}>
                <TagLabel>{type}</TagLabel>
                <TagRightIcon as={ChevronDownIcon} />
            </Tag>
            {showMenu && (
                <Box
                    position="absolute"
                    top="100%"
                    mt={2}
                    zIndex={1}
                    bg="white"
                    border="1px solid #E2E8F0"
                    boxShadow="md"
                    borderRadius="md"
                    width="250px"
                    p={3}
                >
                    <HStack justify="space-between">
                        <Text fontSize="md" fontWeight="medium">
                            {type}
                        </Text>
                        <Menu>
                            <MenuButton as={IconButton} icon={<GoKebabHorizontal />} size="xs" variant="ghost" />
                            <MenuList>
                                <MenuItem icon={<DeleteIcon />} onClick={onDelete}>
                                    Delete Filter
                                </MenuItem>
                                <MenuItem icon={<SmallCloseIcon />}>Add to advanced filter</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Input
                        mt={2}
                        placeholder={`Enter ${type} value`}
                        value={menuValue}
                        onChange={(e) => {
                            setMenuValue(e.target.value);
                            onValueChange(e.target.value);
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export const SearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState([]);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const filterMenuRef = useRef();

    const addFilter = (filterType) => {
        setFilters([...filters, { type: filterType, value: '' }]);
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

    const handleSearch = () => {
        const searchParams = {};
        filters.forEach((filter) => {
            if (filter.value.trim()) {
                searchParams[filter.type.toLowerCase()] = filter.value;
            }
        });
        onSearch(searchParams);
    };

    return (
        <Box w="100%" p={2} position="relative">
            <HStack p={2} spacing={3}>
                {filters.map((filter, index) => (
                    <FilterTag
                        key={index}
                        type={filter.type}
                        value={filter.value}
                        onValueChange={(value) => updateFilterValue(index, value)}
                        onDelete={() => removeFilter(index)}
                    />
                ))}
                {/* Add Filter Button Container with Relative Positioning */}
                <Box position="relative" display="inline-block">
                    {/* Add Filter Button */}
                    <Button
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                        leftIcon={<Icon as={AddIcon} />}
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

                    {/* Dropdown Menu for Adding Filter Types */}
                    {filterMenuOpen && (
                        <Box
                            position="absolute"
                            top="100%" // Align directly below the Add Filter button
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
                                Choose filter type
                            </Text>
                            <Box onClick={() => addFilter('Text')} p={2} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                                Text
                            </Box>
                            <Box onClick={() => addFilter('Tags')} p={2} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                                Tags
                            </Box>
                            <Box onClick={() => addFilter('Check')} p={2} cursor="pointer" _hover={{ bg: 'gray.100' }}>
                                Check (Todo Completion)
                            </Box>
                        </Box>
                    )}
                </Box>
            </HStack>

            <Box p={2} textAlign="right">
                <Button colorScheme="purple" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
};
