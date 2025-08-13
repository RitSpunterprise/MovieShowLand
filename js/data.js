import { config } from './config.js';

/**
 * Fetches a list of movie titles from the API for a specific page.
 * @param {string} pageToken - The page token for next page to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of movie and tv series objects.
 * @throws {Error} Throws an error if the network request fails or the API returns a non-successful status.
 */
export const data = async (pageToken = '') => {
    const url = new URL(config.API_URL);
    url.searchParams.append('pageToken', pageToken); //e.g 'https://api.imdbapi.dev/titles?pageToken=${item.nextPageToken} = https://api.imdbapi.dev/titles?pageToken="fsdlkfjdsajfsj"'

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }

        return await response.json() || [];
    } catch (error) {
        console.error("Failed to fetch movie and tv series data:", error);
        return [];
    }
};