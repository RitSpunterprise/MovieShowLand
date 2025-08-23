// Uses ColorThief library to extract a color palette from an image.
const colorThief = new ColorThief();

/**
 * Sets a dynamic theme on the page based on the color palette of an image.
 * @param {HTMLImageElement} imgElement The image element to extract colors from.
 */
export const setDynamicTheme = async (imgElement) => {
    try {
        // Extract a 5-color palette from the image.
        const palette = colorThief.getPalette(imgElement, 5);

        if (palette && palette.length > 1) {
            const [color1, color2, color3, color4, color5] = palette;

            const color1Complete = `${color1[0]}, ${color1[1]}, ${color1[2]}`;
            const color2Complete = `${color2[0]}, ${color2[1]}, ${color2[2]}`;
            const color3Complete = `${color3[0]}, ${color3[1]}, ${color3[2]}`;
            const color4Complete = `${color4[0]}, ${color4[1]}, ${color4[2]}`;
            const color5Complete = `${color5[0]}, ${color5[1]}, ${color5[2]}`;

            // Create a gradient from the first three colors for the background.
            const gradient = `linear-gradient(135deg, rgb(${color1Complete}), rgb(${color2Complete}), rgb(${color3Complete}))`;

            // Add a semi-transparent overlay to the background.
            document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${gradient}`;
            document.body.style.backgroundAttachment = 'fixed';

            // Calculate the average color of the gradient.
            const avgR = (color1[0] + color2[0] + color3[0]) / 3;
            const avgG = (color1[1] + color2[1] + color3[1]) / 3;
            const avgB = (color1[2] + color2[2] + color3[2]) / 3;

            // Adjust text color for readability based on the average background brightness.
            const luminance = avgR * 0.299 + avgG * 0.587 + avgB * 0.114;
            // Adjust text color for readability based on the color 1 background brightness.
            const luminanceColor1 = color1[0] * 0.299 + color1[1] * 0.587 + color1[2] * 0.114;
            // Adjusted threshold to 128 for better contrast with the overlay
            const textColor = luminance > 170 ? '#212529' : '#f5f5f5';
            document.body.style.color = textColor;

            // Apply theme to list items.
            const listItems = document.querySelectorAll('.list-group-item');
            if (listItems) {
                listItems.forEach(item => {
                    item.style.backgroundColor = `rgba(${color4Complete}, 0.3)`;
                    item.style.color = textColor;
                    item.style.borderColor = `rgba(${color1Complete}, 1)`
                });
            }

            // Apply theme to the main title.
            const titleContainer = document.querySelector('.title-container');
            const titleElement = document.querySelector('h1');
            if (titleContainer && titleElement) {
                const containerColor = `rgba(${color1Complete}, 0.9)`;
                // const titleColor = `rgb(${color2Complete})`;
                const titleColor = luminanceColor1 > 160 ? '#212529' : '#f5f5f5';;
                titleContainer.style.backgroundColor = containerColor;
                titleElement.style.color = titleColor;
            }

            // Apply theme to the navbar.
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.backgroundColor = `rgba(${color1Complete}, 1)`;
                navbar.style.border = 'none';
                // navbar.style.color = `rgb(${color2Complete})`;
                navbar.style.color = luminanceColor1 > 160 ? '#212529' : '#f5f5f5';
            }
        }
    } catch (error) {
        console.error('Error applying dynamic theme:', error);
        // Fallback to a default theme if color extraction fails.
        document.body.classList.add('dark-mode');
    }
};