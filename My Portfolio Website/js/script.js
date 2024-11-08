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


// Scroll-in animation script

const observerSlide = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            if (entry.isIntersecting) {
                observerSlide.unobserve(entry.target);
            }
        }, {threshold: 1})
    }
)

const aboutMeDescription = document.querySelector('.about-me-description');
const projectContainers = document.querySelectorAll('.project-container');

observerSlide.observe(aboutMeDescription);
projectContainers.forEach(container => {
    observerSlide.observe(container);
})

// Contact button scroll
document.querySelector('.contact-btn').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Project hover showcase gif

projectContainers.forEach(container => {
    container.addEventListener('mouseover', () => {
        const selectedContainerID = parseInt(container.id);
        const imgElement = container.firstElementChild.firstElementChild;
        if(selectedContainerID === 1) {
            imgElement.setAttribute('src', '/My Portfolio Website/images/PythonStockPredictionWebAppPreview-ezgif.com-optimize.gif');
        } else if(selectedContainerID === 2) {
            imgElement.setAttribute('src', '/My Portfolio Website/images/EzManagePreviewvideo-ezgif.com-video-to-gif-converter.gif');
        }
    });

    container.addEventListener('mouseout', () => {
        const selectedContainerID = parseInt(container.id);
        const imgElement = container.firstElementChild.firstElementChild;
        if(selectedContainerID === 1) {
            imgElement.setAttribute('src', '/My Portfolio Website/images/Stock Prediction Web App.png');
        } else if(selectedContainerID === 2) {
            imgElement.setAttribute('src', '/My Portfolio Website/images/EZManage Web App.png');
        }
    });
});

// Project showcase resolution change
// function setImagesAsBackgrounds() {
//     projectContainers.forEach(container => {
//         const imgElement = container.firstElementChild.firstElementChild;
        
//         if (window.innerWidth <= 768) {
//             if (imgElement && !container.style.backgroundImage) {
//                 container.style.backgroundImage = `url(${imgElement.src})`;
//                 container.style.backgroundSize = 'cover';
//                 container.style.backgroundPosition = 'center';
//                 container.style.backgroundRepeat = 'no-repeat';
//                 imgElement.style.display = 'none'; 
//             }
//         } 
//     });
// }
// setImagesAsBackgrounds();
// document.addEventListener('DOMContentLoaded', () => {
//     setImagesAsBackgrounds(); 
// });


// Dynamically display current year in footer 
document.getElementById('current-year').textContent = new Date().getFullYear();
