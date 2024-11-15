document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    const searchItem = document.querySelector('.search-item');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const moviePreview = document.querySelector('.movie-preview-container');
    const grid = document.querySelector('.movie-grid');
    const body = document.body;
    const defaultText = 'Genres';

    dropdownButton.textContent = defaultText;

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

    // Dropdown functionality for genres
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            dropdownButton.textContent = this.textContent;
        });
    });

    $('#dropdownMenuButton').on('hide.bs.dropdown', function () {
        if (!dropdownButton.textContent || dropdownButton.textContent === defaultText) {
            dropdownButton.textContent = defaultText;
        }
    });

    // Movie Preview Shrinking Effect on Scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            moviePreview.classList.add('scrolled');
        } else {
            moviePreview.classList.remove('scrolled');
        }
    });

    // Event delegation for Add to List and Heart button
    document.querySelector('.movie-grid').addEventListener('click', function (event) {
        const target = event.target;

        // Handle Add to List button
        if (target.closest('.add-list-btn')) {
            const button = target.closest('.add-list-btn');
            const icon = button.querySelector('i');
            const label = button.querySelector('.action-label');

            if (button.classList.contains('active')) {
                icon.classList.replace('fa-check', 'fa-plus');
                label.textContent = 'Add to My List';
            } else {
                icon.classList.replace('fa-plus', 'fa-check');
                label.textContent = 'Remove from My List';
            }

            button.classList.toggle('active');
        }

        // Handle Heart button
        if (target.closest('.heart-btn')) {
            const button = target.closest('.heart-btn');
            const heartIcon = button.querySelector('i');

            if (heartIcon.classList.contains('far')) { // Outline heart
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'filled'); // Filled heart
            } else {
                heartIcon.classList.remove('fas', 'filled');
                heartIcon.classList.add('far'); // Outline heart
            }
        }
    });
});
