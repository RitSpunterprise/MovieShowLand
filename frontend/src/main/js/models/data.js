import { config } from '../config/config.js';
import { sanitizeInput } from '../utils/sanitizeInputs.js';

/**
 * Fetches a list of Movie and TV Show titles from the API for a specific page.
 * @param {string} pageToken - The page token for next page to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of movie and tv series objects.
 * @throws {Error} Throws an error if the network request fails or the API returns a non-successful status.
 */
export const getTitlesData = async (pageToken = '') => {
    const sanitizedPageToken = sanitizeInput(pageToken);
    const url = new URL(config.API_URL);
    url.searchParams.append('pageToken', sanitizedPageToken); //e.g 'https://api.imdbapi.dev/titles?pageToken=${item.nextPageToken} = https://api.imdbapi.dev/titles?pageToken="fsdlkfjdsajfsj"'

    try {
        const response = await fetch(url, {
            priority: 'high',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }

        return await response.json() || [];
    } catch (error) {
        console.error("Failed to fetch movie and tv series data:", error);
        return [];
    }
};

/**
 * Fetches a single Movie or TV Show title from the API by its ID.
 * @param {string} id - The ID of the title to fetch.
 * @returns {Promise<Object>} A promise that resolves to a movie or tv series object.
 * @throws {Error} Throws an error if the network request fails or the API returns a non-successful status.
 */
export const getTitleById = async (id) => {
    const sanitizedId = sanitizeInput(id);
    const url = new URL(`${config.API_URL}/${sanitizedId}`);
    try {
        const response = await fetch(url, {
            priority: 'high',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }

        return await response.json() || [];
    } catch (error) {
        console.error(`Failed to fetch title data for id: ${id}`, error);
        return null;
    }
};

/**
 * Searches for Movie or TV Show titles by name.
 * @param {string} titleName - The name of the title to search for.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing search results, or null if an error occurs.
 * @throws {Error} Throws an error if the network request fails.
 */
export const searchTitleByName = async (titleName) => {
    const sanitizedTitleName = sanitizeInput(titleName);
    const url = new URL(`${config.BASE_API_URL}/search/titles`);
    url.searchParams.append('query', sanitizedTitleName)
    url.searchParams.append('limit', '50')
    try {
        const response = await fetch(url, {
            priority: 'high',
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }
        const res = await response.json();
        //console.log(res)
        return res || [];
    } catch (error) {
        console.error(`Failed to search title data for: ${titleName}`, error);
        return null;
    }
}