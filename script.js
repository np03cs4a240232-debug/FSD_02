document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navLinks = document.getElementById("primary-navigation");
    const scrollProgress = document.getElementById("scroll-progress");
    const yearEl = document.getElementById("year");

    yearEl.textContent = new Date().getFullYear();

    // Menu toggle
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Scroll progress bar
    function updateScrollBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + "%";
    }
    window.addEventListener("scroll", updateScrollBar);

    // Form validation
    const form = document.getElementById("contact-form");
    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const formMessage = document.getElementById("form-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        errorName.textContent = "";
        errorEmail.textContent = "";
        formMessage.textContent = "";

        if (!name) {
            valid = false;
            errorName.textContent = "Name is required";
        }

        const emailPattern = /^[^@]+@[^@]+\.[a-z]+$/i;
        if (!email || !emailPattern.test(email)) {
            valid = false;
            errorEmail.textContent = "Enter a valid email";
        }

        if (valid) {
            formMessage.textContent = "Thank you! I will contact you soon.";
            formMessage.style.color = "green";
            form.reset();
        } else {
            formMessage.textContent = "Fix the errors above.";
            formMessage.style.color = "red";
        }
    });
});
