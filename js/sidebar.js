$(document).ready(function () {
    let sidebarOpen = false;

    // Toggle the sidebar on hamburger click
    $('#toggle-sidebar').click(function () {
        if (sidebarOpen) {
            $('#offcanvas-sidebar').addClass('collapsed').removeClass('open');
        } else {
            $('#offcanvas-sidebar').removeClass('collapsed').addClass('open');
        }
        sidebarOpen = !sidebarOpen;
    });
});

// JavaScript
const dropdownButton = document.querySelector('.dropdown-toggle');
const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach(item => {
  item.addEventListener('click', function() {
    dropdownButton.innerText = item.innerText;
  });
});
