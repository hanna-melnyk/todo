// components/ToggleColorModeButton.js
import React from 'react';
import { IconButton, ButtonGroup, Button, useColorMode, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ToggleColorModeButton = ({ buttonVariant = "icon" }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const activeBg = useColorModeValue("#b6bbc1", "#1A202C"); // Active background color
    const inactiveBg = useColorModeValue("#E2E8F0", "#2D3748"); // Inactive background color


    // For icon-only rendering
    if (buttonVariant === "icon") {
        const icon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;
        const label = colorMode === 'light' ? "Switch to dark mode" : "Switch to light mode";
        return (
            <Tooltip label={label} placement="right">
                <IconButton
                    aria-label={label}
                    icon={icon}
                    onClick={toggleColorMode}
                    bg={"transparent"}
                    color="white"
                    _hover={{ bg: "#5316C4" }}
                />
            </Tooltip>
        );
    }

    // For wide button group rendering
    return (
        <ButtonGroup isAttached variant="outline" size="md">
            <Button
                onClick={colorMode === 'dark' ? toggleColorMode : undefined}
                leftIcon={<SunIcon />}
                bg={colorMode === 'light' ? activeBg : inactiveBg}
                color={colorMode === 'light' ? "white" : "gray.500"}
                _hover={{ bg: activeBg }}
                _active={{ bg: activeBg }}
                borderRight="none"
            >
                Light
            </Button>
            <Button
                onClick={colorMode === 'light' ? toggleColorMode : undefined}
                leftIcon={<MoonIcon />}
                bg={colorMode === 'dark' ? activeBg : inactiveBg}
                color={colorMode === 'dark' ? "white" : "gray.500"}
                _hover={{ bg: activeBg }}
                _active={{ bg: activeBg }}
            >
                Dark
            </Button>
        </ButtonGroup>
    );
};


