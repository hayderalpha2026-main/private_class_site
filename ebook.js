document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. SEARCH FUNCTIONALITY ---
    const searchInput = document.getElementById("bookSearch");
    const bookCards = document.querySelectorAll(".book-card-item");

    searchInput.addEventListener("input", function (e) {
        const query = e.target.value.toLowerCase().trim();

        bookCards.forEach(card => {
            const title = card.getAttribute("data-title").toLowerCase();
            if (title.includes(query)) {
                card.style.display = "block"; // Show match
            } else {
                card.style.display = "none";  // Hide miss
            }
        });
    });

    // --- 2. READING/VIEWING (MODAL INJECTION) ---
    const viewButtons = document.querySelectorAll(".view-btn");
    const pdfFrame = document.getElementById("pdfFrame");
    const modalTitle = document.getElementById("pdfReaderModalLabel");
    const readerModal = new bootstrap.Modal(document.getElementById('pdfReaderModal'));

    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const pdfUrl = this.getAttribute("data-pdf");
            const bookTitle = this.getAttribute("data-title");
            
            // Set dynamic header titles & iframe paths
            modalTitle.innerHTML = `<i class="fas fa-book-open me-2 text-primary"></i> Reading: ${bookTitle}`;
            pdfFrame.setAttribute("src", pdfUrl);
            
            // Fire layout modal
            readerModal.show();
        });
    });

    // Clear PDF source when closing modal to save performance memory
    document.getElementById('pdfReaderModal').addEventListener('hidden.bs.modal', function () {
        pdfFrame.setAttribute("src", "");
    });


    // --- 3. DOWNLOAD SIMULATED ACTION ---
    const downloadButtons = document.querySelectorAll(".download-btn");
    const toastEl = document.getElementById('downloadToast');
    const downloadToast = new bootstrap.Toast(toastEl);
    
    const bar = document.getElementById("downloadProgressBar");
    const percentText = document.getElementById("downloadPercent");
    const filenameText = document.getElementById("downloadFileName");

    downloadButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const fileName = this.getAttribute("data-filename");
            filenameText.innerText = `Downloading: ${fileName}`;
            
            // Reset state
            bar.style.width = "0%";
            percentText.innerText = "0%";
            downloadToast.show();

            let progress = 0;
            // Simulated asynchronous chunk interval download sequence
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 15) + 5; // advance dynamically
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    percentText.innerText = "Complete!";
                    bar.style.width = "100%";
                    
                    // Hide the toast automatically shortly after completion
                    setTimeout(() => { downloadToast.hide(); }, 2000);
                } else {
                    bar.style.width = `${progress}%`;
                    percentText.innerText = `${progress}%`;
                }
            }, 250);
        });
    });
});