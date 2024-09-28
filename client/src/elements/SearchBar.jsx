import React, { useState } from 'react';
import { Box, Input, Button, HStack, FormControl, FormLabel, Switch, Collapse, Text, Icon, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [searchTags, setSearchTags] = useState('');
    const [strictSearch, setStrictSearch] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    const handleSearch = () => {
        onSearch({
            text: searchText,
            tags: searchTags,
            strict: strictSearch
        });
    };

    return (
        <Box w="100%" p={2}>
            {/* Main Search Input with Search Button Inside */}
            <HStack p={2}>
                <InputGroup maxW="container.md">
                    <Input
                        placeholder="Search by text..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        pr="4.5rem"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" colorScheme="purple" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </HStack>

            {/* Refine Search Toggle Positioned to the Left and Styled Lighter */}
            <HStack justifyContent="flex-start" cursor="pointer" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} p={2}>
                <Text fontWeight="medium" color="gray.400">Refine your search</Text>
                <Icon as={ChevronDownIcon} boxSize={5} color="gray.400" transform={showAdvancedSearch ? 'rotate(180deg)' : 'rotate(0deg)'} transition="all 0.3s" />
            </HStack>

            {/* Advanced Search Options */}
            <Collapse in={showAdvancedSearch} animateOpacity>
                <Box maxW="container.md" p={2}>
                    <HStack p={2}>
                        <Input
                            placeholder="Search by tags (comma separated)..."
                            value={searchTags}
                            onChange={(e) => setSearchTags(e.target.value)}
                        />
                    </HStack>
                    <HStack p={2}>
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
                    </HStack>
                </Box>
            </Collapse>
        </Box>
    );
};
