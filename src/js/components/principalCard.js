import { imageUrlF, defaultUrl } from '../utils/imageURL.js';

/**
 * Creates a movie card element from a movie data object.
 * @param {object} item - The movie data object.
 * @returns {HTMLElement} The movie card element (a bootstrap column).
 */
export const createPrincipalCard = (item) => {
    const col = document.createElement('div');
    col.className = 'col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-8 d-flex justify-content-center';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const titleLink = document.createElement('a');
    titleLink.href = `src/pages/titlesInfo.html?id=${item.id}`;

    const img = document.createElement('img');
    img.id = 'card-image'
    img.className = 'card-img-top lazy'; // Add a 'lazy' class for the observer to target
    img.loading = 'lazy';
    img.decoding = "async";
    img.fetchPriority = "high";

    // Use a placeholder image initially
    img.src = defaultUrl();

    // Store the actual image URL in a data attribute, resizing and compressing it with an image proxy
    const imageUrl = item['primaryImage']?.url;
    //console.log(`Image for ${item.primaryTitle}:`, imageUrl)

    if (imageUrl) {
        const urlWithoutProtocol = imageUrl.replace('/^https?:\/\//', '');
        const imageUrlP = imageUrlF(urlWithoutProtocol, defaultUrl(), { w: 300, h: 450, fit: 'cover', q: 45 })

        fetch(imageUrlP, { priority: 'high' })
            .then(response => response.blob())
            .then(blob => {

                img.setAttribute('src', URL.createObjectURL(blob));
            })
            .catch(error => console.error("Error fetching dynamic image:", error));

    } else {
        img.setAttribute('src', defaultUrl());
    }

    img.alt = `Poster for ${item['primaryTitle']}`;

    //Add img to the link
    titleLink.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h2');
    title.className = 'card-title text-center mb-4 h5';
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
        item['type'] === 'movie' ? createInfoParagraph('Type 🆎', 'Movie') : createInfoParagraph('Type 🆎', 'TV Series'),
        createInfoParagraph('Release Year 📅', item['startYear']),
        createInfoParagraph('Genres 📋', item['genres']?.join(', ') ?? 'N/A')
    )

    //Paragraph to always be in the card bottom, if append this element to cardBody, the card body is always dinamyc, and the genre list is always changing, so the rating moves too, and isnt fix to the bottom like this way
    const ratingParagraph = createInfoParagraph('Rating ⭐', item['rating']?.aggregateRating ?? 'N/A', 'text-center mb-4');

    card.append(titleLink, cardBody, ratingParagraph);
    col.appendChild(card);

    return col;
};