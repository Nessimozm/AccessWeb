// Validation de formulaire accessible
// Conforme aux règles Opquast et WCAG 2.1

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    if (!form) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Configuration des messages d'erreur
    const errorMessages = {
        email: {
            empty: 'Veuillez saisir votre adresse email',
            invalid: 'Veuillez saisir une adresse email valide (exemple: nom@domaine.fr)'
        },
        password: {
            empty: 'Veuillez saisir votre mot de passe',
            tooShort: 'Le mot de passe doit contenir au moins 8 caractères'
        }
    };

    // Fonction de validation en temps réel
    function validateField(input, errorElementId, validationRules) {
        const errorElement = document.getElementById(errorElementId);
        const value = input.value.trim();

        // Réinitialiser l'état
        input.removeAttribute('aria-invalid');
        errorElement.textContent = '';

        // Vérification selon les règles
        for (const rule of validationRules) {
            if (!rule.test(value)) {
                input.setAttribute('aria-invalid', 'true');
                errorElement.textContent = rule.message;
                return false;
            }
        }

        return true;
    }

    // Règles de validation pour l'email
    const emailValidationRules = [
        {
            test: (value) => value.length > 0,
            message: errorMessages.email.empty
        },
        {
            test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: errorMessages.email.invalid
        }
    ];

    // Règles de validation pour le mot de passe
    const passwordValidationRules = [
        {
            test: (value) => value.length > 0,
            message: errorMessages.password.empty
        },
        {
            test: (value) => value.length >= 8,
            message: errorMessages.password.tooShort
        }
    ];

    // Validation à la perte de focus (blur)
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateField(emailInput, 'email-error', emailValidationRules);
        });

        // Retirer l'erreur lors de la saisie
        emailInput.addEventListener('input', function() {
            if (emailInput.getAttribute('aria-invalid') === 'true') {
                const errorElement = document.getElementById('email-error');
                if (emailInput.value.trim().length > 0) {
                    emailInput.removeAttribute('aria-invalid');
                    errorElement.textContent = '';
                }
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validateField(passwordInput, 'password-error', passwordValidationRules);
        });

        // Retirer l'erreur lors de la saisie
        passwordInput.addEventListener('input', function() {
            if (passwordInput.getAttribute('aria-invalid') === 'true') {
                const errorElement = document.getElementById('password-error');
                if (passwordInput.value.trim().length > 0) {
                    passwordInput.removeAttribute('aria-invalid');
                    errorElement.textContent = '';
                }
            }
        });
    }

    // Validation à la soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        // Valider email
        if (emailInput) {
            const emailValid = validateField(emailInput, 'email-error', emailValidationRules);
            if (!emailValid) {
                isValid = false;
                // Mettre le focus sur le premier champ en erreur
                if (isValid === false) {
                    emailInput.focus();
                }
            }
        }

        // Valider mot de passe
        if (passwordInput) {
            const passwordValid = validateField(passwordInput, 'password-error', passwordValidationRules);
            if (!passwordValid) {
                isValid = false;
                // Si l'email est valide mais pas le mot de passe, focus sur le mot de passe
                if (emailInput && emailInput.getAttribute('aria-invalid') !== 'true') {
                    passwordInput.focus();
                }
            }
        }

        // Si tout est valide, soumettre le formulaire
        if (isValid) {
            // Ici, on simule une soumission
            // Dans un cas réel, form.submit() serait appelé ou une requête AJAX serait effectuée
            showSuccessMessage();
        } else {
            // Afficher un message d'erreur global
            showGlobalError('Veuillez corriger les erreurs dans le formulaire avant de continuer.');
        }
    });

    // Afficher un message de succès (simulation)
    function showSuccessMessage() {
        const globalError = document.getElementById('global-error');
        if (globalError) {
            globalError.removeAttribute('hidden');
            globalError.style.background = '#f0f9f4';
            globalError.style.borderColor = '#4a7c59';

            const errorMessage = document.getElementById('error-message');
            errorMessage.style.color = '#4a7c59';
            errorMessage.textContent = 'Connexion réussie ! Redirection en cours...';

            // Simuler une redirection après 2 secondes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    // Afficher un message d'erreur global
    function showGlobalError(message) {
        const globalError = document.getElementById('global-error');
        if (globalError) {
            globalError.removeAttribute('hidden');
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = message;
        }
    }
});

// Amélioration progressive : détection du support JavaScript
document.documentElement.classList.add('js-enabled');