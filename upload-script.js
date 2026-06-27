document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const container = document.querySelector(".dropzone-container");
    const dropzoneBox = document.getElementById("dropzoneBox");
    
    const progressPanel = document.getElementById("uploadProgressPanel");
    const activeFileName = document.getElementById("activeFileName");
    const uploadBar = document.getElementById("uploadBar");
    const uploadPercentage = document.getElementById("uploadPercentage");
    
    const cancelUploadBtn = document.getElementById("cancelUploadBtn");
    const submitFormBtn = document.getElementById("submitFormBtn");
    const uploadForm = document.getElementById("ebookUploadForm");

    let simulatedUploadInterval = null;

    // --- DRAG OVER ANIMATION TRIGGERS ---
    fileInput.addEventListener("dragenter", () => container.classList.add("drag-over"));
    fileInput.addEventListener("dragleave", () => container.classList.remove("drag-over"));
    fileInput.addEventListener("drop", () => container.classList.remove("drag-over"));

    // --- HANDLE FILE RECOGNITION ---
    fileInput.addEventListener("change", function (e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Basic validation check to verify if document is a PDF
            if (file.type !== "application/pdf") {
                alert("Invalid format. Please select a valid PDF file document.");
                this.value = "";
                return;
            }
            
            startSimulatedUpload(file.name);
        }
    });

    // --- SIMULATED UPLOAD PROGRESS ROUTINE ---
    function startSimulatedUpload(filename) {
        // Toggle view visibility panels smoothly
        dropzoneBox.classList.add("d-none");
        progressPanel.classList.remove("d-none");
        activeFileName.innerText = filename;
        
        // Lock input to freeze action while processing
        fileInput.disabled = true;

        let percentage = 0;
        uploadBar.style.width = "0%";
        uploadPercentage.innerText = "0%";

        simulatedUploadInterval = setInterval(() => {
            percentage += Math.floor(Math.random() * 12) + 4; // increment random metrics
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(simulatedUploadInterval);
                
                uploadBar.className = "progress-bar bg-success"; // Green success color
                uploadPercentage.innerText = "Done!";
                submitFormBtn.removeAttribute("disabled"); // Enable submission form button
            } else {
                uploadBar.style.width = `${percentage}%`;
                uploadPercentage.innerText = `${percentage}%`;
            }
        }, 200);
    }

    // --- CANCEL ACTION FUNCTIONALITY ---
    cancelUploadBtn.addEventListener("click", resetUploadComponent);

    function resetUploadComponent() {
        clearInterval(simulatedUploadInterval);
        fileInput.disabled = false;
        fileInput.value = ""; // clear selected item trace
        
        uploadBar.style.width = "0%";
        uploadBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-primary";
        
        progressPanel.classList.add("d-none");
        dropzoneBox.classList.remove("d-none");
        submitFormBtn.setAttribute("disabled", "true");
    }

    // --- FINAL FORM SUBMISSION HOOK ---
    uploadForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        if (!uploadForm.checkValidity()) {
            uploadForm.classList.add("was-validated");
            return;
        }

        alert("Success! The e-book and its accompanying metadata records have been cataloged successfully.");
        uploadForm.reset();
        uploadForm.classList.remove("was-validated");
        resetUploadComponent();
    });
});