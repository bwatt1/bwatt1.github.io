const images = [
    "img/slideshow1.jpg",
    "img/slideshow2.jpg",
    "img/slideshow3.jpg",
    "img/slideshow4.jpg"
];

const track = document.getElementById("carousel-track");
const speed = 80; // px/sec
let offset = 0;
let lastTime = null;

/* Fisher-Yates shuffle with no immediate repeats */
function shuffledSequence(count) {
    let seq = [];
    let last = null;

    while (seq.length < count) {
        const img = images[Math.floor(Math.random() * images.length)];
        if (img !== last || images.length === 1) {
            seq.push(img);
            last = img;
        }
    }
    return seq;
}

/* Build one full strip */
function buildStrip() {
    const stripLength = 12; // how many images per cycle
    const sequence = shuffledSequence(stripLength);

    sequence.forEach(src => {
        const item = document.createElement("div");
        item.className = "carousel-item";

        const img = document.createElement("img");
        img.src = src;

        const yOffset = Math.random() * 80 - 40;
        item.style.transform = `translateY(${yOffset}px)`;

        item.appendChild(img);
        track.appendChild(item);
    });
}

/* Build TWO strips for seamless looping */
buildStrip();
buildStrip();

const totalWidth = track.scrollWidth / 2;

function animate(time) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;

    offset += (speed * delta) / 1000;
    offset %= totalWidth; // 🔑 key line — no DOM changes

    track.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);