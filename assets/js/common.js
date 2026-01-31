/* ========================================
   Common JavaScript - Atharva Tilewale Portfolio
   ======================================== */

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme immediately to prevent flash
initTheme();

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-custom');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px var(--shadow-color)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Theme toggle button event listener
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Copy to clipboard utility
function copyToClipboard(text, successCallback) {
    navigator.clipboard.writeText(text).then(() => {
        if (successCallback) successCallback();
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show/hide element utility
function toggleElement(element, show) {
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

// Animate on scroll (simple implementation)
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Current year for footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});
