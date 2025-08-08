
/**
 * 
 * @returns {Array} Titles from https://api.imdbapi.dev/titles
 */
export const data = async () => {
    try {
        const response = await fetch('https://api.imdbapi.dev/titles');
        const data = await response.json();
        //data.titles porque retorna un objeto con mas objetos anidados pero queremos unicamente el de titles, data.titles retorna un arreglo con todos los objetos
        return data.titles;

    } catch (error) {
        throw error;
    }
}