/**
 * Sanitizes a string to allow only letters, numbers and spaces.
 * @param {string} str The string to sanitize.
 * @returns {string} The sanitized string.
 */
export const sanitizeInput = (str) => {
    if (!str) return '';
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
};