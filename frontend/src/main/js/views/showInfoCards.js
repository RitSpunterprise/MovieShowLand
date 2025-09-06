import { setDynamicTheme } from '../themes/dynamicTheme.js';
import { getTitleById } from '../models/data.js';
import { createInformationalCard } from '../components/informationalCard.js';
import { sanitizeInput } from '../utils/sanitizeInputs.js';

const titleContainer = document.getElementById('title-container');

/**
 * Renders the title information on the page.
 * @param {object} item - The title data object.
 */
const renderTitle = async (item) => {
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
    document.title = `${item.primaryTitle} (${item.startYear}) - MovieShowland`;

    // Create and append the informational card from the component
    const infoCard = createInformationalCard(item);
    titleContainer.appendChild(infoCard);

    // Set dynamic theme based on the title image
    const titleImage = document.getElementById('title-image');
    if (titleImage) {
        // titleImage.crossOrigin is set within the component
        if (titleImage.complete) {
            await setDynamicTheme(titleImage);
            loadCurtain();
            NProgress.done();
        } else {
            titleImage.addEventListener('load', async () => {
                await setDynamicTheme(titleImage);
                loadCurtain();
                NProgress.done();
            });
        }
    }
};

/**
 * Fetches and renders the title information when the page loads.
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get the title ID from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const unsafeTitleId = urlParams.get('id');
        const titleId = sanitizeInput(unsafeTitleId);

        if (titleId) {
            // Fetch the title data by ID and render it
            const data = await getTitleById(titleId);
            await renderTitle(data);
        }
    } catch (error) {
        console.error('Error fetching and rendering title:', error);
        // Optionally, render an error message to the user
    }
});

const loadCurtain = () => {
    //Preloader
    let preloadContainer = document.getElementById("load_curtain");
    preloadContainer.style.visibility = 'hidden';
    preloadContainer.style.opacity = '0';
}