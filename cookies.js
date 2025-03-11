class CookieConsent {
    constructor() {
        this.cookieConsentKey = 'gdpr_cookie_consent';
        this.cookiePreferencesKey = 'gdpr_cookie_preferences';
        this.initializeCookieBanner();
        this.loadPreferences();
    }

    initializeCookieBanner() {
        if (!this.hasUserConsent()) {
            this.showCookieBanner();
        }
        this.attachEventListeners();
    }

    createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <p class="lang-en">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                    <p class="lang-ro">Folosim cookie-uri pentru a îmbunătăți experiența dvs. Continuând să vizitați acest site, sunteți de acord cu utilizarea cookie-urilor.</p>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="cookie-btn accept">
                        <span class="lang-en">Accept All</span>
                        <span class="lang-ro">Acceptă Toate</span>
                    </button>
                    <button id="cookie-settings" class="cookie-btn settings">
                        <span class="lang-en">Cookie Settings</span>
                        <span class="lang-ro">Setări Cookie</span>
                    </button>
                    <button id="cookie-reject" class="cookie-btn reject">
                        <span class="lang-en">Reject All</span>
                        <span class="lang-ro">Respinge Toate</span>
                    </button>
                </div>
            </div>`;
        return banner;
    }

    createCookieSettings() {
        const settings = document.createElement('div');
        settings.id = 'cookie-settings-modal';
        settings.innerHTML = `
            <div class="cookie-settings-content">
                <h2 class="lang-en">Cookie Settings</h2>
                <h2 class="lang-ro">Setări Cookie</h2>
                <div class="cookie-options">
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="necessary-cookies" checked disabled>
                            <span class="lang-en">Necessary Cookies</span>
                            <span class="lang-ro">Cookie-uri Necesare</span>
                        </label>
                        <p class="lang-en">Essential for the website to function properly.</p>
                        <p class="lang-ro">Esențiale pentru funcționarea corectă a site-ului.</p>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="analytics-cookies">
                            <span class="lang-en">Analytics Cookies</span>
                            <span class="lang-ro">Cookie-uri Analitice</span>
                        </label>
                        <p class="lang-en">Help us understand how visitors interact with our website.</p>
                        <p class="lang-ro">Ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru.</p>
                    </div>
                    <div class="cookie-option">
                        <label>
                            <input type="checkbox" id="marketing-cookies">
                            <span class="lang-en">Marketing Cookies</span>
                            <span class="lang-ro">Cookie-uri de Marketing</span>
                        </label>
                        <p class="lang-en">Used to deliver personalized advertisements.</p>
                        <p class="lang-ro">Utilizate pentru a livra reclame personalizate.</p>
                    </div>
                </div>
                <div class="cookie-settings-buttons">
                    <button id="save-preferences" class="cookie-btn save">
                        <span class="lang-en">Save Preferences</span>
                        <span class="lang-ro">Salvează Preferințele</span>
                    </button>
                </div>
            </div>`;
        return settings;
    }

    showCookieBanner() {
        const banner = this.createCookieBanner();
        document.body.appendChild(banner);
    }

    showCookieSettings() {
        const settings = this.createCookieSettings();
        document.body.appendChild(settings);
        this.loadSavedPreferences();
    }

    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-accept') {
                this.acceptAll();
            } else if (e.target.id === 'cookie-reject') {
                this.rejectAll();
            } else if (e.target.id === 'cookie-settings') {
                this.showCookieSettings();
            } else if (e.target.id === 'save-preferences') {
                this.savePreferences();
            }
        });
    }

    acceptAll() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        this.saveConsent(preferences);
        this.hideCookieBanner();
    }

    rejectAll() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.saveConsent(preferences);
        this.hideCookieBanner();
    }

    savePreferences() {
        const preferences = {
            necessary: true,
            analytics: document.getElementById('analytics-cookies').checked,
            marketing: document.getElementById('marketing-cookies').checked
        };
        this.saveConsent(preferences);
        this.hideSettings();
        this.hideCookieBanner();
        
        // Redirect to home page
        window.location.href = 'index.html';
    }

    loadSavedPreferences() {
        const preferences = this.getPreferences();
        if (preferences) {
            document.getElementById('analytics-cookies').checked = preferences.analytics;
            document.getElementById('marketing-cookies').checked = preferences.marketing;
        }
    }

    saveConsent(preferences) {
        localStorage.setItem(this.cookieConsentKey, 'true');
        localStorage.setItem(this.cookiePreferencesKey, JSON.stringify(preferences));
        this.loadPreferences();
    }

    hasUserConsent() {
        return localStorage.getItem(this.cookieConsentKey) === 'true';
    }

    getPreferences() {
        const preferences = localStorage.getItem(this.cookiePreferencesKey);
        return preferences ? JSON.parse(preferences) : null;
    }

    loadPreferences() {
        const preferences = this.getPreferences();
        if (preferences) {
            // Initialize analytics if consent given
            if (preferences.analytics) {
                this.initializeAnalytics();
            }
            // Initialize marketing if consent given
            if (preferences.marketing) {
                this.initializeMarketing();
            }
        }
    }

    initializeAnalytics() {
        // Implement your analytics initialization here
        console.log('Analytics initialized');
    }

    initializeMarketing() {
        // Implement your marketing cookies initialization here
        console.log('Marketing initialized');
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.remove();
        }
    }

    hideSettings() {
        const settings = document.getElementById('cookie-settings-modal');
        if (settings) {
            settings.remove();
        }
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
}); 