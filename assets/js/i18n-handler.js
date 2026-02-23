document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('appointedLanguage') || 'en';

    function updateContent() {
        if (typeof translations === 'undefined') {
            console.error('Translations not found!');
            return;
        }

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
                    el.innerHTML = translation;
                }
            }
        });

        document.documentElement.lang = currentLang;
    }

    // Use a clearer selector for buttons
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            if (lang && translations[lang]) {
                currentLang = lang;
                localStorage.setItem('appointedLanguage', currentLang);
                updateContent();
                // Close dropotron if open (standard template behavior)
                if (window.jQuery && btn.closest('.dropotron')) {
                    $(btn).closest('.dropotron').trigger('dropotron:hide');
                }
            }
        });
    });


    // Initial load
    updateContent();
});
