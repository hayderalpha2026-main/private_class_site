document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("studentContactForm");

    contactForm.addEventListener("submit", function (event) {
        // Prevent generic navigation actions
        event.preventDefault();

        // Standard Bootstrap 5 programmatic input check confirmation routine
        if (!contactForm.checkValidity()) {
            event.stopPropagation();
            contactForm.classList.add("was-validated");
            return;
        }

        // Simulating processing logic outcome triggers
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Disable button to prevent multi-clicking while simulating submission
        submitButton.disabled = true;
        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...`;

        setTimeout(() => {
            alert("Thank you! Your inquiry ticket has been registered successfully. Our team will correspond via email shortly.");
            
            // Clear input metrics safely
            contactForm.reset();
            contactForm.classList.remove("was-validated");
            
            // Restore interactive components state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 1500);
    });
});