const track = document.getElementById("carousel-track");
const overlay = document.getElementById("bg-text");

// Array of all image paths in your folder
const images = [
    "img/esk8_r1_img1.jpg",
    "img/esc_img1.jpg",
    "img/tbc.jpg",
    "img/another_img.jpg",
    "img/more_img.jpg"
];

// Number of carousel items to show
const numItems = 10;

// Build carousel dynamically with random images
for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgPath = images[randomIndex];

    const div = document.createElement("div");
    div.classList.add("carousel-item");

    const img = document.createElement("img");
    img.src = imgPath;

    div.appendChild(img);
    track.appendChild(div);
}

// Duplicate items for seamless looping
track.innerHTML += track.innerHTML;

// Compute overlay center
const overlayRect = overlay.getBoundingClientRect();
const heroRect = overlay.parentElement.getBoundingClientRect();
const overlayCenter = overlayRect.top + overlayRect.height / 2 - heroRect.top;

// Align carousel baseline to text
const firstImg = track.querySelector("img");
const imgHeight = firstImg ? firstImg.offsetHeight : 260;
track.style.top = `${overlayCenter - imgHeight / 2}px`;

// Random vertical offsets
const items = track.querySelectorAll(".carousel-item");
items.forEach(item => {
    const offset = (2 * Math.random() - 1) * 100;
    item.style.transform = `translateY(${offset}px)`;
});

// Infinite scroll
let scrollPos = 0;
const speed = 80;
let lastTime = null;

function animateCarousel(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    scrollPos += (speed * delta) / 1000;

    if (scrollPos >= track.scrollWidth / 2) scrollPos = 0;

    track.style.transform = `translateX(${-scrollPos}px)`;
    requestAnimationFrame(animateCarousel);
}

requestAnimationFrame(animateCarousel);
