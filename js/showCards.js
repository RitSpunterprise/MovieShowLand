import { data } from './data.js'
import { createMovieCard } from './components/card.js'

const container = document.getElementById('cards');
const loadingIndicator = document.getElementById('loading');
const errorDisplay = document.getElementById('error');

const displayMovies = async () => {
  try {
    //Consume promise data()
    const items = await data();

    if (!items || items.length === 0) {
      errorDisplay.textContent = 'No movies found.';
      errorDisplay.classList.remove('d-none');
      return;
    }

    // Hide loading indicator
    loadingIndicator.style.display = 'none';
    //Start to show the items
    items.forEach(item => {
      const movieCard = createMovieCard(item);
      container.appendChild(movieCard);
    });
  } catch (error) {
    loadingIndicator.style.display = 'none'; // Hide loading indicator
    errorDisplay.textContent = `Failed to load movies and tv series. Please try again later. Error: ${error.message}`;
    errorDisplay.classList.remove('d-none');
    console.error("Error fetching movies and tv series data:", error);
  }
}

displayMovies();