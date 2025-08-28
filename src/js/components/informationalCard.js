import { imageUrlF, defaultUrl } from '../utils/imageURL.js';

/**
 * Creates an informational card for a movie or TV series.
 * @param {object} item - The title data object.
 * @returns {HTMLElement} The informational card element.
 */
export const createInformationalCard = (item) => {
    const row = document.createElement('div');
    row.className = 'row d-flex flex-row justify-content-center align-items-center py-4';

    // Image column
    const imageCol = document.createElement('div');
    imageCol.className = 'col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-10';
    const img = document.createElement('img');
    img.id = 'title-image';
    img.className = 'card-img-top img-fluid rounded';
    img.alt = item.primaryTitle;
    img.crossOrigin = "Anonymous"; // Needed for ColorThief
    img.loading = 'lazy';
    img.decoding = "async";
    img.fetchPriority = "high";

    const imageUrl = item.primaryImage?.url;
    if (imageUrl) {
        const urlWithoutProtocol = imageUrl.replace('/^(https?:)?\/\//', '');
        img.src = imageUrlF(urlWithoutProtocol, defaultUrl(), { w: 400, h: 600, fit: 'cover', q: 55 });
    } else {
        img.src = defaultUrl();
    }

    imageCol.appendChild(img);

    // Details column
    const detailsCol = document.createElement('div');
    detailsCol.className = 'col-xxl-6 col-xl-8 col-lg-10 col-md-12 d-flex flex-column justify-content-center mt-3 mb-5';

    const titleContainer = document.createElement('div')
    titleContainer.className = 'title-container rounded mb-3';
    const title = document.createElement('h1');
    title.className = 'text-center mt-1 mb-2 p-1';
    title.textContent = `${item.primaryTitle} (${item.startYear})`;
    titleContainer.appendChild(title)

    const plotTitle = document.createElement('h2');
    plotTitle.className = 'text-center';
    plotTitle.textContent = 'Overview'
    const plot = document.createElement('p');
    plot.className = 'text-center';
    plot.textContent = item.plot;

    const list = document.createElement('ul');
    list.className = 'list-group rounded';

    // Helper to create list items
    const createListItem = (label, value, additionalInfo = '') => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.append(document.createTextNode(`${label}: `))
        const strong = document.createElement('strong');
        strong.textContent = `${value} ${additionalInfo}`;
        li.appendChild(strong);
        return li;
    };

    const type = item.type === 'movie' ? 'Movie' : 'TV Series' || 'N/A';
    const genres = item.genres?.join(', ') || 'N/A';
    const rating = item.rating?.aggregateRating || 'N/A';
    const directors = item.directors?.map(d => d.displayName).join(', ') || 'N/A';
    const writers = item.writers?.map(w => w.displayName).join(', ') || 'N/A';
    const stars = item.stars?.map(s => s.displayName).join(', ') || 'N/A';
    const lang = item['spokenLanguages']?.map(l => l.name).join(', ') || 'N/A';
    const country = item['originCountries']?.map(c => c.name).join(', ') || 'N/A';
    const runTime = (item['runtimeSeconds'] / 60) || 'N/A';

    list.append(
        createListItem('Type', type),
        createListItem('Directors', directors),
        createListItem('Writers', writers),
        createListItem('Stars', stars),
        createListItem('Genres', genres),
        createListItem('Rating', rating),
        createListItem('Spoken Languages', lang),
        createListItem('Origin Country', country),
        createListItem('Running time', runTime, !(runTime === 'N/A') ? 'minutes' : '')
    );

    detailsCol.append(titleContainer, plotTitle, plot, list);
    row.append(imageCol, detailsCol);

    return row;
};
