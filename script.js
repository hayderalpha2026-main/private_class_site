document.addEventListener("DOMContentLoaded", function () {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    sidebarToggle.addEventListener("click", function () {
        if (window.innerWidth >= 992) {
            // Desktop behavior: Shrink/Expand sidebar margins
            sidebar.classList.toggle("collapsed");
            mainContent.classList.toggle("expanded");
        } else {
            // Mobile behavior: Slide sidebar into view as overlay drawer
            sidebar.classList.toggle("active");
            sidebarOverlay.classList.toggle("show");
        }
    });

    // Close mobile sidebar if clicked on the overlay background
    sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("show");
    });

    // Optional: Resets layout toggles automatically if window changes sizing thresholds 
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("show");
        } else {
            sidebar.classList.remove("collapsed");
            mainContent.classList.remove("expanded");
        }
    });
});