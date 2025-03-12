document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        // Create cookie consent bar
        const cookieBar = document.createElement('div');
        cookieBar.className = 'cookie-consent-bar';
        cookieBar.innerHTML = `
            <div class="cookie-content">
                <p class="lang-en">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <p class="lang-ro">Folosim cookie-uri pentru a vă îmbunătăți experiența. Continuând să vizitați acest site, sunteți de acord cu utilizarea cookie-urilor.</p>
                <div class="cookie-buttons">
                    <button class="accept-cookies">
                        <span class="lang-en">Accept</span>
                        <span class="lang-ro">Accept</span>
                    </button>
                    <button class="reject-cookies">
                        <span class="lang-en">Reject</span>
                        <span class="lang-ro">Refuz</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBar);

        // Add event listeners to buttons
        document.querySelector('.accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBar.style.display = 'none';
            enableCookies();
        });

        document.querySelector('.reject-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieBar.style.display = 'none';
            disableCookies();
        });
    }
});

function enableCookies() {
    // Enable your cookies and tracking here
    console.log('Cookies enabled');
}

function disableCookies() {
    // Disable non-essential cookies here
    console.log('Cookies disabled');
} 