document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('appointedLanguage') || 'en';

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                const translation = translations[currentLang][key];

                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.type === 'submit' || el.type === 'reset' || el.type === 'button') {
                        el.value = translation;
                    } else {
                        el.placeholder = translation;
                    }
                } else {
                    el.textContent = translation;
                }
            }
        });

        document.documentElement.lang = currentLang;
    }

    // New switch logic
    document.body.addEventListener('click', (e) => {
        const langBtn = e.target.closest('.lang-switch');
        if (langBtn) {
            e.preventDefault();
            const lang = langBtn.getAttribute('data-lang');
            if (lang && translations[lang]) {
                currentLang = lang;
                localStorage.setItem('appointedLanguage', currentLang);
                updateContent();
            }
        }

        // Support old toggle button if it still exists
        if (e.target.id === 'lang-toggle-btn') {
            e.preventDefault();
            currentLang = currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('appointedLanguage', currentLang);
            updateContent();
        }
    });

    // Initial load
    updateContent();
});
