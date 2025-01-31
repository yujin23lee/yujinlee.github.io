const body = document.querySelector('body');
const menImages = document.querySelectorAll('img.men');
const bodyWidth = body.offsetWidth;
const bodyHeight = window.innerHeight;

// Store the speed and position for each image
const fallSpeeds = [];
const menPositions = [];

menImages.forEach((menImage) => {
    fallSpeeds.push(Math.random() * 3 + 1);  // Random fall speed between 1 and 4
    menPositions.push({
        x: Math.random() * (bodyWidth - menImage.offsetWidth),
        y: Math.random() * bodyHeight - menImage.offsetHeight
    });

    // Set initial positions
    menImage.style.left = `${menPositions[menPositions.length - 1].x}px`;
    menImage.style.top = `${menPositions[menPositions.length - 1].y}px`;
});
let scrollSpeedFactor = 1; // Default scroll speed factor
let scrollPosition = 0;

// Adjust falling speed based on scroll position
window.addEventListener('scroll', () => {
    // Calculate the scroll position (distance scrolled)
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPosition = window.scrollY;
  
    // Normalize the scroll position to get a speed factor
    scrollSpeedFactor = 1 + (scrollPosition / documentHeight) * 3; // Max factor will be 4x
});

// Custom scroll handler for keyboard events (Arrow Up/Down for speed)
window.addEventListener('keydown', (event) => {
    const speedAdjustment = 0.5;  // Speed adjustment per key press
    if (event.key === 'ArrowDown') {
        // Increase fall speed (faster falling)
        fallSpeeds.forEach((fallSpeed, index) => {
            fallSpeeds[index] = Math.min(fallSpeed + speedAdjustment, 10); // Max speed cap at 10
        });
    } else if (event.key === 'ArrowUp') {
        // Decrease fall speed (slower falling)
        fallSpeeds.forEach((fallSpeed, index) => {
            fallSpeeds[index] = Math.max(fallSpeed - speedAdjustment, 0.1); // Min speed cap at 0.1
        });
    }
});

function animateMen() {
    menImages.forEach((menImage, index) => {
        let menX = menPositions[index].x;
        let menY = menPositions[index].y;
        const windowHeight = window.innerHeight;
        const imageHeight = menImage.offsetHeight;

        // Apply fall speed with the current fall speed
        const fallSpeed = fallSpeeds[index];

        // Apply fall speed
        menY += fallSpeed;

        // Reset position if the image goes out of the window
        if (menY > windowHeight) {
            menY = -imageHeight;
            menX = Math.random() * (window.innerWidth - menImage.offsetWidth);
        }
        menPositions[index] = { x: menX, y: menY };
        menImage.style.left = `${menX}px`;
        menImage.style.top = `${menY}px`;
    });
    requestAnimationFrame(animateMen);
}
animateMen();

document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    setTimeout( () => {
        splashScreen.style.display = "none";
        mainContent.style.display = "block";
    }, 5000);
});