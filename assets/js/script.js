document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const defaultLang = 'en';
    
    // Set default language
    document.body.setAttribute('data-lang', defaultLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            document.body.setAttribute('data-lang', lang);
            
            // Update active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}); 