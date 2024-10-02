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
 * Generates styles for ListItem based on the current color mode.
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
