document.addEventListener('DOMContentLoaded', function () {
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    const searchItem = document.querySelector('.search-item');
    const body = document.body;

    // Helper function to reset search input
    function resetSearch() {
        searchInput.style.width = '0';
        searchInput.style.opacity = '0';
        searchItem.classList.remove('active');
    }

    // Run resetSearch on page load to ensure search section is icon-only initially
    resetSearch();

    // Sidebar toggle functionality
    toggleSidebarButton.addEventListener('click', function () {
        body.classList.toggle('sidebar-collapsed');
        if (body.classList.contains('sidebar-collapsed')) {
            resetSearch(); // Close search if sidebar is collapsed
        }
        adjustCarousel(!body.classList.contains('sidebar-collapsed'));
    });

    // Search icon toggle functionality
    searchIcon.addEventListener('click', function () {
        if (body.classList.contains('sidebar-collapsed')) {
            body.classList.remove('sidebar-collapsed'); // Open sidebar if collapsed
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

    // Collapse search input on blur
    searchInput.addEventListener('blur', function () {
        if (!searchInput.value) {
            resetSearch();
        }
    });

    // Adjust carousel layout to fit within a single page
    function adjustCarousel(sidebarOpen) {
        const windowWidth = window.innerWidth;
        const featuredCarousel = document.getElementById('featuredCarousel');
        const continueCarousel = document.getElementById('continueCarousel');

        if (sidebarOpen || windowWidth < 768) {
            // Full width for carousels when sidebar is open or on small screens
            featuredCarousel.style.marginLeft = '0';
            featuredCarousel.style.width = '100%';
            continueCarousel.style.marginLeft = '0';
            continueCarousel.style.width = '100%';
        } else {
            // Center-align carousels and reduce bottom carousel height for better view
            featuredCarousel.style.marginLeft = '0';
            featuredCarousel.style.width = '100%';
            continueCarousel.style.marginLeft = '0';
            continueCarousel.style.width = '100%';
        }

        // Adjusting height of the bottom carousel to fit within a single view
        continueCarousel.style.height = '250px'; // Adjust this height as needed
        featuredCarousel.style.height = 'calc(100vh - 350px)'; // To ensure both carousels fit on the page
    }

    // Initial adjustment on load
    adjustCarousel(!body.classList.contains('sidebar-collapsed'));

    // Adjust carousel on window resize
    window.addEventListener('resize', function () {
        adjustCarousel(!body.classList.contains('sidebar-collapsed'));
    });
});
