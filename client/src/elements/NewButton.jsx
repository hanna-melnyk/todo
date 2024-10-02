// client/src/elements/NewButton.jsx
import React from 'react';
import { Button, IconButton, ButtonGroup } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

/**
 * NewButton Component
 * @param {boolean} showTodoForm - State indicating if the form is visible
 * @param {function} setShowTodoForm - Function to toggle form visibility
 */
export const NewButton = ({ showTodoForm, setShowTodoForm }) => {
    return (
        <ButtonGroup size="sm" isAttached>
            <Button
                onClick={() => setShowTodoForm(!showTodoForm)}
                bg="#611FEA"
                color="white"
                _hover={{ bg: "#5316C4" }}
                _active={{ bg: "#4a13b3" }}
                border="none"
                borderRadius="md"
            >
                {showTodoForm ? 'Cancel' : 'New'}
            </Button>
            <IconButton
                aria-label={showTodoForm ? 'Close form' : 'Open form'}
                icon={showTodoForm ? <CloseIcon /> : <AddIcon />}
                onClick={() => setShowTodoForm(!showTodoForm)}
                bg="#611FEA"
                color="white"
                _hover={{ bg: "#5316C4" }}
                _active={{ bg: "#4a13b3" }}
                border="none"
                borderRadius="md"
            />
        </ButtonGroup>
    );
};

