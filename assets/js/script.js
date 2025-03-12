document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    let currentLang = localStorage.getItem('language') || 'en';
    document.body.setAttribute('data-lang', currentLang);
    updateLanguageButtons(currentLang);

    // Add click event listeners to language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Function to switch language
    function switchLanguage(lang) {
        document.body.setAttribute('data-lang', lang);
        localStorage.setItem('language', lang);
        updateLanguageButtons(lang);
    }

    // Function to update language button states
    function updateLanguageButtons(activeLang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === activeLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}); 