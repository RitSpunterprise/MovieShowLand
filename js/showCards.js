import { data } from './data.js';
import { createMovieCard } from './components/card.js';

const container = document.getElementById('cards');
const loadingIndicator = document.getElementById('loading');
const errorDisplay = document.getElementById('error');
//const observerTrigger = document.getElementById('observer-trigger');
const loadTrigger = document.getElementById('load-trigger');

let currentPage = '';
let isLoading = false;
let allItems = [];

const displayMovies = async (items) => {
  if (!items || items.length === 0) {
    if (!currentPage) {
      errorDisplay.textContent = 'No movies found.';
      errorDisplay.classList.remove('d-none');
    }
    return;
  }

  await items.forEach(item => {
    const movieCard = createMovieCard(item);
    container.appendChild(movieCard);
  });

  //Once everything is uploaded, then we show the load more content button 
  loadTrigger.classList.remove('d-none')
};

const loadNextPage = async () => {
  if (isLoading) return;
  isLoading = true;
  loadingIndicator.style.display = 'block';

  try {
    const items = await data(currentPage);
    if (items['titles'].length > 0) {

      //REVIEW WHAT THIS DOES
      allItems = [...allItems, ...items['titles']];

      displayMovies(items['titles']);
      if (items.nextPageToken) {
        currentPage = items.nextPageToken;
      }
    } else {
      // No more items to load, hide the trigger
      //observerTrigger.style.display = 'none';
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

// const observer = new IntersectionObserver((entries) => {
//   if (entries[0].isIntersecting) {
//     loadNextPage();
//   }
// }, {
//   rootMargin: '100px' // Load content 100px before it enters the viewport
// });

// observer.observe(observerTrigger);

// Initial load
loadNextPage();
loadTrigger.addEventListener('click', async () => {
  await loadNextPage();
})