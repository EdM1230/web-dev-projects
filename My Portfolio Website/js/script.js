// Menu function
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownMenuImg = document.querySelector('.dropdown-menu-icon img')
const links = dropdownMenu.querySelectorAll('a');

function toggleMenu() {
    dropdownMenu.classList.toggle('active');
    var isMenuToggled = dropdownMenu.classList.contains('active');
    if(isMenuToggled) {
        dropdownMenuImg.setAttribute('src', '/My Portfolio Website/assets/icons/close-svgrepo-com.svg');
    } else if(!isMenuToggled) {
        dropdownMenuImg.setAttribute('src', '/My Portfolio Website/assets/icons/menu-svgrepo-com.svg');
    }
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
        const SELECTED_CONTAINER_ID = parseInt(container.id);
        const IMG_ELEMENT = container.firstElementChild.firstElementChild;
        const ACCEPTABLE_RESOLUTION = 768;
        if(SELECTED_CONTAINER_ID === 1) {
            if(window.screen.width > ACCEPTABLE_RESOLUTION) {
                IMG_ELEMENT.setAttribute('src', '/My Portfolio Website/images/PythonStockPredictionWebAppPreview-ezgif.com-optimize.gif');
            } else {}
        } else if(SELECTED_CONTAINER_ID === 2) {
            if(window.screen.width > ACCEPTABLE_RESOLUTION) {
                IMG_ELEMENT.setAttribute('src', '/My Portfolio Website/images/EzManagePreviewvideo-ezgif.com-video-to-gif-converter.gif');
            } else {}
        }
    });
    container.addEventListener('mouseout', () => {
        const SELECTED_CONTAINER_ID = parseInt(container.id);
        const IMG_ELEMENT = container.firstElementChild.firstElementChild;
        const ACCEPTABLE_RESOLUTION = 768;
        if(SELECTED_CONTAINER_ID === 1) {
            if(window.screen.width > ACCEPTABLE_RESOLUTION) {
                IMG_ELEMENT.setAttribute('src', '/My Portfolio Website/images/Stock Prediction Web App.png');
            } else {}
        } else if(SELECTED_CONTAINER_ID === 2) {
            if(window.screen.width > ACCEPTABLE_RESOLUTION) {
                IMG_ELEMENT.setAttribute('src', '/My Portfolio Website/images/EZManage Web App.png');
            } else {}
        }
    });
});

// Contact form script
const form = document.getElementById('form');
const submissionResult = document.querySelector('.submission-result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    submissionResult.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                submissionResult.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                submissionResult.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            submissionResult.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                submissionResult.style.display = "none";
            }, 3000);
        });
    });

// Dynamically display current year in footer 
document.getElementById('current-year').textContent = new Date().getFullYear();