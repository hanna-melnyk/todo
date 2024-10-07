//client/src/elements/FilterTag.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, HStack, Tag, Text, TagLabel, TagRightIcon, Menu, MenuButton, MenuList, MenuItem, Input, IconButton, useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { GoKebabHorizontal } from 'react-icons/go';
import {getSolidContainerStyle, getMenuItemHoverStyle} from "../theme-helper.js";


/*FilterTag component is used to return custom designs for each field type*/
export const FilterTag = ({ type, value, name, onValueChange, onDelete, allTags }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [filteredTags, setFilteredTags] = useState([]);
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const { colorMode } = useColorMode(); // Get the color mode from Chakra UI


    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setCurrentValue(newValue);
        onValueChange(newValue);

        // Filter tags based on the current input value
        if (type === 'tags') {
            const searchValue = newValue.split(',').pop().trim();
            const selectedTags = newValue.split(',').map((tag) => tag.trim()).filter((tag) => tag !== ''); // Get existing tags

            const filtered = allTags
                .filter((tag) => tag.toLowerCase().includes(searchValue.toLowerCase())) // Match with input
                .filter((tag) => !selectedTags.includes(tag)); // Exclude already selected tags

            setFilteredTags(filtered);
        }
    };



    // Update the input field when a tag is clicked
    const handleTagClick = (tag, event) => {
        event.stopPropagation(); // Prevent click event from propagating
        const tagsArray = currentValue.split(',').map((tag) => tag.trim());
        tagsArray[tagsArray.length - 1] = tag; // Replace the last fragment with the selected tag
        const updatedTags = tagsArray.filter((t) => t !== '').join(', ') + ', ';
        setCurrentValue(updatedTags);
        onValueChange(updatedTags); // Update parent with new tag value
        setFilteredTags([]); // Close dropdown after selecting a tag
        inputRef.current.focus(); // Keep focus on the input field
    };


    const handleCheckboxSelection = (option) => {
        setCurrentValue(option);
        onValueChange(option);
        setShowMenu(false);
    };

    // Define custom input UI for each filter type
    const renderFilterInput = () => {
        switch (type) {
            case 'text':
                return <Input placeholder={`Search by ${name}`} value={currentValue} onChange={handleInputChange} />;
            case 'tags':
                return (
                    <Box>
                        <Input
                            ref={inputRef}
                            placeholder={`Search by ${name}, comma separated`}
                            value={currentValue}
                            onChange={handleInputChange}
                            mb={2}
                        />
                        <Box position="relative" width="100%">
                            {filteredTags.length > 0 && (
                                <Box
                                    ref={menuRef}
                                    maxH="200px"
                                    overflowY="scroll"
                                    position="absolute"
                                    top="100%"
                                    zIndex={1}
                                    width="100%"
                                    {...getSolidContainerStyle(colorMode)}
                                >
                                    {filteredTags.map((tag, index) => (
                                        <HStack
                                            key={index}
                                            onClick={(event) => handleTagClick(tag, event)}
                                            _hover={getMenuItemHoverStyle(colorMode)}
                                            p={2}
                                        >
                                            <Tag size="lg" variant="subtle" colorScheme="purple" borderRadius="md" px={4} py={1.5}>
                                                <TagLabel fontSize="sm" fontWeight="medium">
                                                    {tag}
                                                </TagLabel>
                                            </Tag>
                                        </HStack>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                );
            case 'checkbox':
                return (
                    <Box>
                        {/* Options for Checkbox */}
                        <Box onClick={() => handleCheckboxSelection('Checked')} p={2} cursor="pointer" _hover={getMenuItemHoverStyle(colorMode)}>
                            <Text>Checked</Text>
                        </Box>

                        <Box onClick={() => handleCheckboxSelection('Unchecked')} p={2} cursor="pointer" _hover={getMenuItemHoverStyle(colorMode)}>
                            <Text>Unchecked</Text>
                        </Box>
                    </Box>
                );
            default:
                return null;
        }
    };

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
                    {...getSolidContainerStyle(colorMode)}
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
                            </MenuList>
                        </Menu>
                    </HStack>
                    {renderFilterInput()}
                </Box>
            )}
        </Box>
    );
};
