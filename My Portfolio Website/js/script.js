// Menu function
const dropdownMenu = document.querySelector('.dropdown-menu');
const links = dropdownMenu.querySelectorAll('a');

function toggleMenu() {
    dropdownMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

links.forEach((link) => {
    link.addEventListener('click', () => {
        document.body.classList.remove('no-scroll');
        dropdownMenu.classList.remove('active');
    })
})

// Tech stack slideshow 
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const PREVIOUSTECH = "prev-tech";
const ACTIVETECH = "active-tech";
const NEXTTECH = "next-tech";
let currentSlideIndex = 0;
let prevSlideIndex;
let nextSlideIndex;

function nextSlide() {
    resetVisibilityType(); // reset visibility before re-assigning
    prevSlideIndex = currentSlideIndex;
    currentSlideIndex = nextSlideIndex;
    nextSlideIndex = (nextSlideIndex + 1) % totalSlides;
    assignVisibilityType();
}

function prevSlide() {
    resetVisibilityType();
    nextSlideIndex = currentSlideIndex;
    currentSlideIndex = prevSlideIndex;
    prevSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    assignVisibilityType();
}

function initSlideshow() {
    prevSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
    assignVisibilityType();
}

function assignVisibilityType() {
    slides[prevSlideIndex].classList.add(PREVIOUSTECH);
    slides[currentSlideIndex].classList.add(ACTIVETECH);
    slides[nextSlideIndex].classList.add(NEXTTECH);
}

function resetVisibilityType() {
    slides[prevSlideIndex].classList.remove(PREVIOUSTECH);
    slides[currentSlideIndex].classList.remove(ACTIVETECH);
    slides[nextSlideIndex].classList.remove(NEXTTECH);
}

initSlideshow();


// Contact button scroll
document.querySelector('.contact-btn').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Dynamically display current year in footer 
document.getElementById('current-year').textContent = new Date().getFullYear();
