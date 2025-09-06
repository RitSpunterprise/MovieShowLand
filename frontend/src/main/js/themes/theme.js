//Toggle button
const themeToggle = document.getElementById('theme-toggle');
//Body
const body = document.body;
//Toggle icon
const toggleIcon = document.getElementById('theme-toggle-icon');

const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        //Sun icon
        toggleIcon.src = './frontend/src/main/assets/images/icons/sun-fill.svg'
        toggleIcon.className = 'mt-1'
        toggleIcon.alt = 'Sun icon'

    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        //Moon icon
        toggleIcon.src = './frontend/src/main/assets/images/icons/moon-fill.svg'
        toggleIcon.className = 'mt-1'
        toggleIcon.alt = 'Moon icon'
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