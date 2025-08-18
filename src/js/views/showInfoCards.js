import { setDynamicTheme } from '../themes/dynamicTheme.js';
import { getTitleById } from '../models/data.js';
import { createInformationalCard } from '../components/informationalCard.js';

const titleContainer = document.getElementById('title-container');

/**
 * Renders the title information on the page.
 * @param {object} item - The title data object.
 */
const renderTitle = (item) => {
    // Clear previous content
    titleContainer.textContent = '';

    if (!item) {
        const errorElement = document.createElement('p');
        errorElement.className = 'text-center';
        errorElement.textContent = 'Title not found.';
        titleContainer.appendChild(errorElement);
        return;
    }

    // Set the document title
    document.title = item.primaryTitle;

    // Create and append the informational card from the component
    const infoCard = createInformationalCard(item);
    titleContainer.appendChild(infoCard);

    // Set dynamic theme based on the title image
    const titleImage = document.getElementById('title-image');
    if (titleImage) {
        // titleImage.crossOrigin is set within the component
        if (titleImage.complete) {
            setDynamicTheme(titleImage);
        } else {
            titleImage.addEventListener('load', () => {
                setDynamicTheme(titleImage);
            });
        }
    }
};

/**
 * Fetches and renders the title information when the page loads.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Get the title ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const titleId = urlParams.get('id');

    if (titleId) {
        // Fetch the title data by ID and render it
        const data = await getTitleById(titleId);
        renderTitle(data);
    }
});