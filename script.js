// Language switching functionality
const langButtons = document.querySelectorAll('.lang-btn');
const body = document.body;

// Load saved language preference and set active dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    setActiveDropdowns();
});

// Function to set active dropdowns based on current page
function setActiveDropdowns() {
    const currentPath = window.location.pathname.toLowerCase();
    const servicesDropdown = document.querySelector('.services-dropdown');
    const aboutDropdown = document.querySelector('.about-dropdown');

    // Check if current page is a service page
    if (currentPath.includes('services') || 
        currentPath.includes('cookie-scanning') ||
        currentPath.includes('privacy-impact') ||
        currentPath.includes('documentation-training') ||
        currentPath.includes('gdpr-audit')) {
        servicesDropdown.classList.add('active');
    }

    // Check if current page is an about page
    if (currentPath.includes('about') ||
        currentPath.includes('certified-expertise') ||
        currentPath.includes('diverse-experience') ||
        currentPath.includes('comprehensive-solutions') ||
        currentPath.includes('trusted-partner')) {
        aboutDropdown.classList.add('active');
    }
}

// Set language and update UI
function setLanguage(lang) {
    // Update body attribute
    body.setAttribute('data-lang', lang);
    
    // Update buttons active state
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Language button click handlers
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    const currentLang = body.getAttribute('data-lang');
    const message = currentLang === 'ro' 
        ? 'Vă mulțumim pentru mesaj. Vă vom contacta în curând!'
        : 'Thank you for your message. We will get back to you soon!';
    alert(message);
    contactForm.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
});

// Panel expansion functionality
document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.service-panel');
    
    panels.forEach(panel => {
        panel.addEventListener('click', function() {
            // Toggle expanded class on clicked panel
            this.classList.toggle('expanded');
            
            // Optional: Close other panels when one is opened
            panels.forEach(otherPanel => {
                if (otherPanel !== this) {
                    otherPanel.classList.remove('expanded');
                }
            });
        });
    });
}); 