/**
 * @file Manages the display and lazy loading of movie and TV show cards in the main view.
 * It uses an IntersectionObserver to load more content as the user scrolls and handles restoring the scroll position when navigating back to the page.
 */

import { getTitlesData, searchTitleByName } from '../models/data.js';
import { createPrincipalCard } from '../components/principalCard.js';

const container = document.getElementById('cards');
const loadingIndicator = document.getElementById('loading');
const errorDisplay = document.getElementById('error');
const observerTrigger = document.getElementById('observer-trigger');
//Preloader LoadCurtain
const preloadContainer = document.getElementById("load_curtain");

let currentPage = '';
let isLoading = false;
let allItems = [];

/**
 * Appends a list of movie/TV show items to the main container.
 * Also adds a click listener to each card to save the scroll position.
 * @param {Array<Object>} items - The list of items to display.
 */
const displayMovies = async (items) => {
  if (!items || items.length === 0) {
    if (!currentPage) {
      errorDisplay.textContent = 'No movies found.';
      errorDisplay.classList.remove('d-none');
    }
    return;
  }

  items.forEach(item => {
    const movieCard = createPrincipalCard(item);
    // Save scroll position in session storage when a card is clicked before navigating.
    movieCard.addEventListener('click', () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
      // NProgress.start();
    });
    container.appendChild(movieCard);
  });
};

/**
 * Handles the search form submission.
 * It prevents the default form action, performs a search, and updates the display.
 */
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputSearch = document.getElementById('input-search').value;
  //Fade in preloader
  fadeInPreloader();

  if (!inputSearch) {
    sessionStorage.removeItem('searchQuery');
    window.location.reload();
    return;
  }
  sessionStorage.setItem('searchQuery', inputSearch); // Save search query
  const items = await searchTitleByName(inputSearch);
  clearCardsContainer(container);
  // Once the content is loaded, scroll to the inicial position.
  window.scrollTo(0, parseInt(0, 10));
  loadNextPage(items);
  //Fade out preloader
  fadeOutPreloader(300);
});

/**
 * Fetches the next page of data from the API and displays it.
 * Handles loading states and errors.
 * @param {Object} [items=undefined] - An optional object containing titles and pagination info to load directly.
 */
const loadNextPage = async (items = undefined) => {
  if (isLoading) return;
  isLoading = true;
  loadingIndicator.style.display = 'block';

  try {
    if (!(items)) {
      const searchQuery = sessionStorage.getItem('searchQuery');
      if (searchQuery) {
        console.log('Hello')
        items = await searchTitleByName(searchQuery);
      } else {
        items = await getTitlesData(currentPage);
      }
    }

    if (items['titles'].length > 0) {
      // Concatenate new items with existing ones
      allItems = [...allItems, ...items['titles']];

      displayMovies(items['titles']);

      if (items.nextPageToken) {
        currentPage = items.nextPageToken;
      } else {
        // No more items to load, hide the trigger
        observerTrigger.style.display = 'none';
      }
    } else {
      // No more items to load, hide the trigger
      observerTrigger.style.display = 'none';
    }
  } catch (error) {
    errorDisplay.textContent = `Failed to load movies and tv series. Please try again later. Error: ${error.message}`;
    errorDisplay.classList.remove('d-none');
    console.error("Error fetching movies and tv series data:", error);
  } finally {
    isLoading = false;
    loadingIndicator.classList.add('d-none');
  }
};

/**
 * Sets up an IntersectionObserver to detect when the user is close to the end of the page,
 * triggering the load of the next page.
 */
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadNextPage();
  }
}, {
  rootMargin: '800px' // Load content 800px before it enters the viewport
});

/**
 * Handles the initial loading process of the page.
 * It checks if a scroll position is saved in sessionStorage to restore it,
 * otherwise, it performs a normal initial load.
 */
const initialLoad = async () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  const searchQuery = sessionStorage.getItem('searchQuery');

  //Quit Preloader
  fadeOutPreloader()

  if (searchQuery) {
    document.getElementById('input-search').value = searchQuery;
    // const items = await searchTitleByName(searchQuery);
    // clearCardsContainer(container);
    // loadNextPage(items);
  }

  // If no scroll position is saved, perform a normal load.
  if (!scrollPosition) {
    observer.observe(observerTrigger);
    if (!searchQuery) {
      await loadNextPage();
    }
    return;
  }

  // If a scroll position is found, restore it.
  sessionStorage.removeItem('scrollPosition');

  // Temporarily disconnect the IntersectionObserver to prevent conflicts while restoring scroll.
  observer.disconnect();

  /**
   * Recursively loads pages until the document is tall enough to scroll to the saved position.
   */
  const loadUntilScrollable = async () => {
    if (searchQuery) {
      const items = await searchTitleByName(searchQuery);
      clearCardsContainer(container);
      loadNextPage(items);
    } else {
      await loadNextPage();
    }

    //Add Preloader
    fadeInPreloader();

    // Wait for the next frame to allow the DOM to update.
    await new Promise(resolve => requestAnimationFrame(resolve));

    // If the page is still not tall enough and more pages are available, load more.
    if (document.documentElement.scrollHeight < scrollPosition && currentPage) {
      await loadUntilScrollable();
    } else {
      // Once the content is loaded, scroll to the saved position.
      window.scrollTo(0, parseInt(scrollPosition, 10));
      // Re-enable the IntersectionObserver for normal lazy loading.
      observer.observe(observerTrigger);
      //Quit preloader
      fadeOutPreloader(300);
    }
  };

  await loadUntilScrollable();
};

/**
 * Removes all child elements from a given container.
 * @param {HTMLElement} container - The container element to clear.
 */
const clearCardsContainer = (container) => {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

/**
 * Fades in the preloader element, making it visible.
 */
const fadeInPreloader = () => {
  //Show preloader LoadCurtain
  preloadContainer.style.visibility = 'visible';
  preloadContainer.style.opacity = '1';
}

/**
 * Fades out the preloader element after a specified timeout.
 * @param {number} [timeOut=50] - The delay in milliseconds before the preloader fades out.
 */
const fadeOutPreloader = (timeOut = 50) => {
  setTimeout(() => {
    //Quit LoadCurtain
    preloadContainer.style.visibility = 'hidden';
    preloadContainer.style.opacity = '0';
  }, timeOut);
}

/**
 * Clears the search query from session storage and reloads the page when the navbar brand is clicked.
 */
document.querySelector('.navbar-brand').addEventListener('click', () => {
  sessionStorage.removeItem('searchQuery');
  window.location.reload();
});

/**
 * Finalizes the NProgress loading bar when the window has fully loaded.
 */
window.onload = function () {
  NProgress.done();
};

// Start the initial load process.
initialLoad();