console.log("Script linked successfully");

 // API configuration details
 const API_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
 const options = {
     method: 'GET',
     headers: {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjEyZmYwNTQyMTQ1Zjk2OTMwN2UxMjhlYWU0NjY3MyIsIm5iZiI6MTczMDg0NTM5OC4zODE4NTQsInN1YiI6IjY2ZTk1NjFlODJmZjg3M2Y3ZDFlYTZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gi_-5IleLtUa4XCv8VwUkHKjJaQNwWPAVOw5Ed3LOUg' // Replace with your API key
     }
 };

// Fetch and process movie data from the API
async function fetchMovies() {
    try {
        const response = await fetch(API_URL, options);
        const data = await response.json();
        populateFeaturedCarousel(data.results);
        populateContinueWatchingCarousel(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to populate the featured movie carousel
function populateFeaturedCarousel(movies) {
    const carouselInner = document.querySelector("#carouselExampleCaptions .carousel-inner");
    const carouselIndicators = document.querySelector("#carouselExampleCaptions .carousel-indicators");

    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    movies.slice(0, 5).forEach((movie, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active");

        carouselItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${movie.title}</h5>
                <p>${movie.overview || "No description available"}</p>
            </div>
        `;
        carouselInner.appendChild(carouselItem);

        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) indicator.classList.add("active");

        carouselIndicators.appendChild(indicator);
    });
}

// Function to populate the continue watching carousel
function populateContinueWatchingCarousel(movies) {
    const continueCarouselInner = document.querySelector("#continueWatchingCarousel .carousel-inner");
    continueCarouselInner.innerHTML = '';

    let carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item', 'active');
    
    let row = document.createElement('div');
    row.classList.add('row', 'gx-2'); // Adds spacing between columns

    movies.slice(0, 6).forEach((movie, index) => {
        const col = document.createElement('div');
        col.classList.add('col-md-4');

        col.innerHTML = `
            <div class="position-relative">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
                <div class="carousel-caption position-absolute bottom-0 start-0 px-2" style="background: rgba(0, 0, 0, 0.7); width: 100%;">
                    <h6 class="mb-0">${movie.title}</h6>
                    <small>${movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"} | Sci-Fi</small>
                </div>
            </div>
        `;

        row.appendChild(col);

        if ((index + 1) % 3 === 0 || index === movies.slice(0, 6).length - 1) {
            carouselItem.appendChild(row);
            continueCarouselInner.appendChild(carouselItem);

            carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            row = document.createElement('div');
            row.classList.add('row', 'gx-2');
        }
    });
}

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    const searchItem = document.querySelector('.search-item');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const body = document.body;

    // Function to reset search input to collapsed state
    function resetSearch() {
        searchInput.style.width = '0';
        searchInput.style.opacity = '0';
        searchItem.classList.remove('active');
    }

    // Sidebar toggle functionality
    function toggleSidebar() {
        body.classList.toggle('sidebar-collapsed');
        if (body.classList.contains('sidebar-collapsed')) {
            resetSearch();
        }
    }

    // Ensure search input is collapsed by default
    resetSearch();

    // Event listener for sidebar toggle button
    toggleSidebarButton.addEventListener('click', toggleSidebar);

    // Search icon toggle functionality
    searchIcon.addEventListener('click', function () {
        if (body.classList.contains('sidebar-collapsed')) {
            toggleSidebar(); // Open the sidebar if it's collapsed
        }
        searchItem.classList.toggle('active');
        if (searchItem.classList.contains('active')) {
            searchInput.style.width = '140px';
            searchInput.style.opacity = '1';
            searchInput.focus();
        } else {
            resetSearch();
        }
    });

    // Collapse search input when it loses focus
    searchInput.addEventListener('blur', function () {
        if (!searchInput.value) {
            resetSearch();
        }
    });
});

// Fetch movie data and display carousels
fetchMovies();
