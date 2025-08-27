# MovieShowLand

A clean and simple web application to browse a list of movies and TV shows, fetched from a remote API.

<!-- Optional: Add a screenshot of your application -->
<!-- ![MoviesShowLand Screenshot](./screenshot.png) -->

## ✨ Features

-   Fetches and displays a dynamic list of movies and TV shows.
-   Clean and responsive card-based layout.
-   Dynamic theme that adapts to the dominant color of the movie/show poster.
-   Robust error handling for API requests.
-   Built with modern JavaScript (ES Modules, Async/Await).
-   Search Functionality: Allows users to search for specific titles.
-   State Preservation: Remembers the user's search query when navigating back to the main page.

## 🛠️ Technologies Used

-   **HTML5**
-   **CSS3**
-   **JavaScript (ES6+)**: Utilizes modern features like `fetch` and `async/await` for handling asynchronous operations.
-   **Bootstrap 5**: For responsive design and UI components.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need a modern web browser and a local web server to run this project due to browser security policies (CORS) for ES Modules. A popular and easy-to-use option is the Live Server extension for Visual Studio Code.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/RitSpunterprise/MoviesShowLand.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd MoviesShowLand
    ```
3.  Open the `index.html` file with a live server. If you are using the VS Code Live Server extension, you can right-click on `index.html` and select "Open with Live Server".

## 📁 File Structure

The project follows a modular structure:

```
/
├── src/
│   ├── js/
│   │   ├── components/
│   │   ├── config/
│   │   ├── models/
│   │   ├── themes/
│   │   ├── utils/
│   │   └── views/
│   ├── css/
│   └── assets/
└── index.html
```

## 🔌 API Reference

This project uses the Free IMDb API to fetch movie and show data.
-   **Endpoint used for main page titles:** `https://api.imdbapi.dev/titles?pageToken=`
-   **Endpoint used for info page titles:** `https://api.imdbapi.dev/title/{titleid}`
-   **Endpoint used for search titles bar:** `https://api.imdbapi.dev/search/titles?query=`