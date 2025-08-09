/**
 * Fetches a list of movie titles from the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of movie and tv shows objects.
 * @throws {Error} Throws an error if the network request fails or the API returns a non-successful status.
 */
export const data = async () => {
    const API_URL = 'https://api.imdbapi.dev/titles';
    const response = await fetch(API_URL);

    // Check if the HTTP response status is successful (e.g., 200 = OK).
    // fetch() only rejects on network errors, not on HTTP error codes.
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON.
    const responseData = await response.json();
    // The API returns an object with a 'titles' property containing the array.
    // Return the titles array, or an empty array if 'titles' is not present.
    return responseData.titles || [];
}