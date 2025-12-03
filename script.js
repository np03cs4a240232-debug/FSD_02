document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navLinks = document.getElementById("primary-navigation");
    const scrollProgress = document.getElementById("scroll-progress");
    const yearEl = document.getElementById("year");

    yearEl.textContent = new Date().getFullYear();

    // Menu toggle
    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const isOpen = navLinks.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.textContent = isOpen ? "✕" : "☰";
        });
    }

    // Scroll progress bar
    function updateScrollBar() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 100;
        const clamped = Math.max(0, Math.min(100, progress));
        scrollProgress.style.width = clamped + "%";
    }
    window.addEventListener("scroll", updateScrollBar);
    // Initialize on load
    updateScrollBar();

    // Form validation
    const form = document.getElementById("contact-form");
    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const formMessage = document.getElementById("form-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let valid = true;
            const nameEl = document.getElementById("name");
            const emailEl = document.getElementById("email");
            const name = nameEl ? nameEl.value.trim() : "";
            const email = emailEl ? emailEl.value.trim() : "";
            if (errorName) errorName.textContent = "";
            if (errorEmail) errorEmail.textContent = "";
            if (formMessage) {
                formMessage.textContent = "";
                formMessage.style.color = "";
            }

            const messageEl = document.getElementById("message");
            const errorMessage = document.getElementById("error-message");
            const message = messageEl ? messageEl.value.trim() : "";

            // Clear previous states
            const fields = [nameEl, emailEl, messageEl];
            fields.forEach(f => {
                if (!f) return;
                f.classList.remove('input-error');
                f.removeAttribute('aria-invalid');
            });
            if (errorMessage) errorMessage.textContent = "";

            // Name validation
            if (!name) {
                valid = false;
                if (errorName) errorName.textContent = "Name is required";
                if (nameEl) { nameEl.classList.add('input-error'); nameEl.setAttribute('aria-invalid', 'true'); }
            } else if (name.length < 2) {
                valid = false;
                if (errorName) errorName.textContent = "Name must be at least 2 characters";
                if (nameEl) { nameEl.classList.add('input-error'); nameEl.setAttribute('aria-invalid', 'true'); }
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!email) {
                valid = false;
                if (errorEmail) errorEmail.textContent = "Email is required";
                if (emailEl) { emailEl.classList.add('input-error'); emailEl.setAttribute('aria-invalid', 'true'); }
            } else if (!emailPattern.test(email)) {
                valid = false;
                if (errorEmail) errorEmail.textContent = "Enter a valid email";
                if (emailEl) { emailEl.classList.add('input-error'); emailEl.setAttribute('aria-invalid', 'true'); }
            }

            // Message validation (require at least 10 characters)
            if (!message) {
                valid = false;
                if (errorMessage) errorMessage.textContent = "Message is required";
                if (messageEl) { messageEl.classList.add('input-error'); messageEl.setAttribute('aria-invalid', 'true'); }
            } else if (message.length < 10) {
                valid = false;
                if (errorMessage) errorMessage.textContent = "Message must be at least 10 characters";
                if (messageEl) { messageEl.classList.add('input-error'); messageEl.setAttribute('aria-invalid', 'true'); }
            }

            // Focus the first invalid field
            if (!valid) {
                const firstInvalid = fields.find(f => f && f.classList.contains('input-error'));
                if (firstInvalid) firstInvalid.focus();
                if (formMessage) {
                    formMessage.textContent = "Please fix the highlighted fields.";
                    formMessage.style.color = "#ff6b6b";
                }
                return;
            }

            // Success
            if (formMessage) {
                formMessage.textContent = "Thank you! I will contact you soon.";
                formMessage.style.color = "#7bd389";
            }
            form.reset();
        });
    }
});
