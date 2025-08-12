import { config } from './config.js';

/**
 * Fetches a list of movie titles from the API.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of movie and tv series objects.
 * @throws {Error} Throws an error if the network request fails or the API returns a non-successful status.
 */
export const data = async () => {
    try {
        const response = await fetch(config.API_URL);

        /* Para procesar la siguiente pagina de peliculas y series, debemos obtener la propiedad de 'nextPageToken' y agregarla a la 'API_URL' mientra siga habiendo un 'nextPageToken', y lo tenemos que concatenar de la siguiente manera para que funcione bien la consulta, e.g 'https://api.imdbapi.dev/titles?pageToken=${item.nextPageToken}' o como lo estamos haciendo 'config.API_URL + `?pageToken=${responseData.nextPageToken}`' */

        // Check if the HTTP response status is successful (e.g., 200 = OK).
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }

        // Parse the response as JSON.
        const responseData = await response.json();
        //console.log(config.API_URL + `?pageToken=${responseData.nextPageToken}`);

        // The API returns an object with a 'titles' property containing the array.
        // Return the titles array, or an empty array if 'titles' is not present.
        return responseData.titles || [];
    } catch (error) {
        console.error("Failed to fetch movie and tv series data:", error);
        // Return an empty array to ensure the application can gracefully handle the error.
        return [];
    }
}