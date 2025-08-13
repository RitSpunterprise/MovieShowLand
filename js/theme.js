//Toggle button
const themeToggle = document.getElementById('theme-toggle');
//Body
const body = document.body;

//Icons
const sunIcon = document.createElement('i');
sunIcon.className = 'bx bxs-light-bulb-on bx-sm'
const moonIcon = document.createElement('i');
moonIcon.className = 'bx bxs-moon-star bx-sm'

//Add the two icons
themeToggle.appendChild(sunIcon);
themeToggle.appendChild(moonIcon);

const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.removeChild(moonIcon);
        themeToggle.appendChild(sunIcon);

    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.removeChild(sunIcon);
        themeToggle.appendChild(moonIcon);
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
};

themeToggle.addEventListener('click', toggleTheme);

// Apply the saved theme on initial load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode
    applyTheme(savedTheme);
});