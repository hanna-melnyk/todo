// src/theme-helper.js

/**
 * This file provides helper functions for generating reusable styles
 * for components in a React application. It abstracts out component-specific
 * styles to keep the main component files cleaner and more maintainable.
 *
 * The functions defined here are used to return style objects, which can be
 * spread into components using the `{...functionName()}` syntax.
 */

/**
 * Generates styles for transparent elements based on the current color mode.
 *
 * @param {string} colorMode - The active color mode ("light" or "dark").
 * @returns {Object} - An object containing style properties for ListItem.
 */
export const getTransparentContainerStyle = (colorMode) => ({
    // Apply different background colors based on the color mode
    bg: colorMode === "light" ? "rgba(239, 239, 239, 0.8)" : "rgba(46, 46, 46, 0.8)",
    color: colorMode === "light" ? "black" : "white",
    borderRadius: "md",
    padding: "8px",
});

/**
 * Generates styles for non-transparent elements based on the current color mode.
 *
 * @param {string} colorMode - The active color mode ("light" or "dark").
 * @returns {Object} - An object containing style properties for ListItem.
 */
export const getSolidContainerStyle = (colorMode) => {
    return {
        bg: colorMode === 'light' ? '#F0F0F0' : '#2C2C2C', // Light gray for light mode, dark gray for dark mode
        color: colorMode === 'light' ? 'black' : 'white',    // Text color based on background contrast
        border: `1px solid ${colorMode === 'light' ? '#E2E8F0' : '#4A5568'}`, // Light border for light mode, darker border for dark mode
        borderRadius: 'md',
        boxShadow: 'md',
    };
};

// New function for menu item hover style
export const getMenuItemHoverStyle = (colorMode) => {
    return {
        bg: colorMode === 'light' ? 'gray.200' : '#3A3A3A', // Slightly lighter gray for dark mode hover, gray.200 for light mode
        cursor: 'pointer'
    };
};
