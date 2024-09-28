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
        <Box w="100%">
            {/* Main Search Input with Search Button Inside */}
            <HStack>
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

            {/* Refine Search Toggle */}
            <HStack justifyContent="center" cursor="pointer" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}> {/* Replace margin with padding */}
                <Text fontWeight="medium">Refine your search</Text>
                <Icon as={ChevronDownIcon} boxSize={5} transform={showAdvancedSearch ? 'rotate(180deg)' : 'rotate(0deg)'} transition="all 0.3s" />
            </HStack>

            {/* Advanced Search Options */}
            <Collapse in={showAdvancedSearch} animateOpacity>
                <Box maxW="container.md">
                    <HStack>
                        <Input
                            placeholder="Search by tags (comma separated)..."
                            value={searchTags}
                            onChange={(e) => setSearchTags(e.target.value)}
                        />
                    </HStack>
                    <HStack>
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
