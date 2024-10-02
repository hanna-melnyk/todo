// client/src/elements/FilterButton.jsx
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FiFilter } from "react-icons/fi";

/**
 * FilterButton Component
 * @param {function} toggleFilter - Function to show/hide the filter form
 * @param {boolean} showFilterForm - Indicates if the filter form is visible
 */
export const FilterButton = ({ toggleFilter, showFilterForm }) => {
    return (
        <IconButton
            icon={<FiFilter />}
            aria-label="Toggle Filters"
            onClick={toggleFilter}
            size="md"
            variant="solid"
            bg="#611FEA"
            _hover={{ bg: "#5316C4" }}
            _active={{ bg: "#4a13b3" }}
            color={"white"}
        />
    );
};

