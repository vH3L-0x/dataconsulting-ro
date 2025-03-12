document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice using sessionStorage or localStorage
    const hasConsent = localStorage.getItem('cookieConsent') || sessionStorage.getItem('cookieConsent');
    if (!hasConsent && window.location.pathname === '/index.html') {
        showCookieConsent();
    }
});

const cookieCategories = {
    necessary: {
        name: 'Necessary',
        name_ro: 'Necesare',
        description: 'Essential cookies that enable basic website functionality and security features.',
        description_ro: 'Cookie-uri esențiale care permit funcționalitatea de bază a site-ului web și caracteristicile de securitate.',
        required: true
    },
    functional: {
        name: 'Functional',
        name_ro: 'Funcționale',
        description: 'Cookies that enhance website functionality and personalize your experience.',
        description_ro: 'Cookie-uri care îmbunătățesc funcționalitatea site-ului web și personalizează experiența dvs.',
        required: false
    },
    analytics: {
        name: 'Analytics',
        name_ro: 'Analitice',
        description: 'Cookies that help us understand how visitors interact with our website.',
        description_ro: 'Cookie-uri care ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru web.',
        required: false
    },
    marketing: {
        name: 'Marketing',
        name_ro: 'Marketing',
        description: 'Cookies used for marketing and advertising purposes.',
        description_ro: 'Cookie-uri utilizate în scopuri de marketing și publicitate.',
        required: false
    }
};

function showCookieConsent() {
    const currentLang = document.body.getAttribute('data-lang') || 'en';
    const consentBar = document.createElement('div');
    consentBar.className = 'cookie-consent-bar';

    let html = `
        <div class="cookie-content">
            <div class="cookie-text">
                <p class="lang-en">We use cookies to enhance your browsing experience and analyze our traffic. Please choose your cookie preferences:</p>
                <p class="lang-ro">Folosim cookie-uri pentru a îmbunătăți experiența de navigare și a analiza traficul nostru. Vă rugăm să alegeți preferințele cookie:</p>
            </div>
            <div class="cookie-settings">
    `;

    // Add cookie categories
    for (const [key, category] of Object.entries(cookieCategories)) {
        html += `
            <div class="cookie-category">
                <label class="cookie-checkbox-label">
                    <input type="checkbox" name="cookie-${key}" 
                           ${category.required ? 'checked disabled' : ''}>
                    <span class="lang-en">${category.name}</span>
                    <span class="lang-ro">${category.name_ro}</span>
                </label>
                <p class="cookie-description lang-en">${category.description}</p>
                <p class="cookie-description lang-ro">${category.description_ro}</p>
            </div>
        `;
    }

    html += `
            </div>
            <div class="cookie-buttons">
                <button class="accept-all-cookies">
                    <span class="lang-en">Accept All</span>
                    <span class="lang-ro">Acceptă Tot</span>
                </button>
                <button class="save-cookie-settings">
                    <span class="lang-en">Save Settings</span>
                    <span class="lang-ro">Salvează Setările</span>
                </button>
                <button class="reject-cookies">
                    <span class="lang-en">Reject All</span>
                    <span class="lang-ro">Respinge Tot</span>
                </button>
            </div>
        </div>
    `;

    consentBar.innerHTML = html;
    document.body.appendChild(consentBar);

    // Event Listeners
    consentBar.querySelector('.accept-all-cookies').addEventListener('click', () => {
        acceptAllCookies();
        hideCookieConsent(consentBar);
    });

    consentBar.querySelector('.save-cookie-settings').addEventListener('click', () => {
        saveSettings(consentBar);
        hideCookieConsent(consentBar);
    });

    consentBar.querySelector('.reject-cookies').addEventListener('click', () => {
        rejectAllCookies();
        hideCookieConsent(consentBar);
    });
}

function acceptAllCookies() {
    const settings = {};
    for (const [key, category] of Object.entries(cookieCategories)) {
        settings[key] = true;
    }
    saveCookieSettings(settings);
    enableCookies(settings);
}

function rejectAllCookies() {
    const settings = {};
    for (const [key, category] of Object.entries(cookieCategories)) {
        settings[key] = category.required;
    }
    saveCookieSettings(settings);
    disableCookies(settings);
}

function saveSettings(consentBar) {
    const settings = {};
    for (const [key, category] of Object.entries(cookieCategories)) {
        const checkbox = consentBar.querySelector(`input[name="cookie-${key}"]`);
        settings[key] = category.required || checkbox.checked;
    }
    saveCookieSettings(settings);
    enableCookies(settings);
}

function saveCookieSettings(settings) {
    // Store in both localStorage (persistent) and sessionStorage (current session)
    localStorage.setItem('cookieConsent', 'true');
    sessionStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
}

function hideCookieConsent(consentBar) {
    consentBar.style.opacity = '0';
    setTimeout(() => {
        consentBar.remove();
    }, 300);
}

function enableCookies(settings) {
    console.log('Enabled cookies:', settings);
    // Implement cookie enabling logic here
    if (settings.analytics) {
        // Enable analytics (e.g., Google Analytics)
    }
    if (settings.marketing) {
        // Enable marketing cookies
    }
    if (settings.functional) {
        // Enable functional cookies
    }
}

function disableCookies(settings) {
    console.log('Disabled cookies:', settings);
    // Implement cookie disabling logic here
    if (!settings.analytics) {
        // Disable analytics
    }
    if (!settings.marketing) {
        // Disable marketing cookies
    }
    if (!settings.functional) {
        // Disable functional cookies
    }
}

// Function to get current cookie settings
function getCookieSettings() {
    const settings = localStorage.getItem('cookieSettings');
    return settings ? JSON.parse(settings) : null;
} 