//client/src/elements/SideMenuButton.jsx
import React from 'react';
import {Tooltip, Button, IconButton} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate} from 'react-router-dom';

export const SideMenuButton = ({ to, onClick, icon, text, buttonVariant={buttonVariant}}) => {
    if (buttonVariant === "wide") {
        return (
            <Button
                as={to ? RouterLink : "button"}
                to={to}
                onClick={onClick}
                leftIcon={icon}
                w="100%"
                bg="#611FEA"
                color="white"
                _hover={{ bg: "#5316C4" }}
                aria-label={text}
            >
                {text}
            </Button>
        );
    }
    return (
        <Tooltip label={text} placement="right">
            <IconButton
                as={to ? RouterLink : "button"}
                to={to}
                onClick={onClick}
                icon={icon}
                aria-label={text}
                bg="#611FEA"
                _hover={{ bg: "#5316C4" }}
                color="white"
            />
        </Tooltip>
    );
};