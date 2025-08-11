/**
 * Creates a movie card element from a movie data object.
 * @param {object} item - The movie data object.
 * @returns {HTMLElement} The movie card element (a bootstrap column).
 */
export const createMovieCard = (item) => {
    const col = document.createElement('div');
    col.className = 'col-md-3';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = item['primaryImage']?.url ?? 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';
    img.alt = `Poster for ${item['primaryTitle']}`;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title text-center';
    title.textContent = item['primaryTitle'];

    // Helper to create <p><strong>Label:</strong> Value</p> elements
    const createInfoParagraph = (label, value, extraClass = '') => {
        const p = document.createElement('p');
        p.className = `card-text ${extraClass}`.trim();
        const strong = document.createElement('strong');
        strong.textContent = `${label}: `;
        p.appendChild(strong);
        p.append(document.createTextNode(value)); // Safely append value as a text node
        return p;
    };

    //Verifying the type of item to display on card at the second append
    cardBody.append(title,
        item['type'] === 'movie' ? createInfoParagraph('Type 🆎', 'Movie') : createInfoParagraph('Type 🆎', 'TV Show'),
        createInfoParagraph('Release Year 📅', item['startYear']),
        createInfoParagraph('Genres 📋', item['genres']?.join(', ') ?? 'N/A'),
        createInfoParagraph('Rating ⭐', item['rating']?.aggregateRating ?? 'N/A', 'text-center')
    )

    card.append(img, cardBody);
    col.appendChild(card);

    return col;
};