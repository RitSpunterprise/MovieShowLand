import { data } from './data.js'
import { createMovieCard } from './components/card.js'

const container = document.getElementById('cards');
const loadingIndicator = document.getElementById('loading');
const errorDisplay = document.getElementById('error');

const displayMovies = async () => {
  try {
    //Consume promise data()
    const items = await data();
    loadingIndicator.style.display = 'none'; // Hide loading indicator

    if (!items || items.length === 0) {
      errorDisplay.textContent = 'No movies found.';
      errorDisplay.classList.remove('d-none');
      return;
    }

    items.forEach(item => {
      const movieCard = createMovieCard(item);
      container.appendChild(movieCard);
    });
  } catch (error) {
    loadingIndicator.style.display = 'none'; // Hide loading indicator
    errorDisplay.textContent = `Failed to load movies. Please try again later. Error: ${error.message}`;
    errorDisplay.classList.remove('d-none');
    console.error("Error fetching movie data:", error);
  }
}

displayMovies();