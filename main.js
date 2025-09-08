// ArtVault Digital Art Marketplace JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('ArtVault Digital Art Marketplace loaded');

    // Search bar toggle functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            searchInput.classList.toggle('active');

            // Focus on input when opened
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.blur();
            }
        });

        // Close search bar when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBtn.contains(e.target) && !searchInput.contains(e.target)) {
                searchInput.classList.remove('active');
            }
        });

        // Handle search input
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    console.log('Searching for:', query);
                    // TODO: Implement actual search functionality
                    alert(`Searching for: ${query}`);
                }
            }
        });
    }

    // Make navigation links open in new tabs
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.href && link.href !== '#') {
            link.setAttribute('target', '_blank');
        }
    });

    // Make footer links open in new tabs
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        if (link.href && link.href !== '#') {
            link.setAttribute('target', '_blank');
        }
    });

    // Make social media links open in new tabs
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        if (link.href && link.href !== '#') {
            link.setAttribute('target', '_blank');
        }
    });

    // Example: Toggle active state for filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // TODO: Add filtering logic here
        });
    });

    // Example: Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
});
