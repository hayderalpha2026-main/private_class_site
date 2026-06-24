document.addEventListener("DOMContentLoaded", function () {
    // அனைத்து ரேடியோ பொத்தான்களையும் பிரிவுகளையும் எடுத்தல்
    const methodCard = document.getElementById("methodCard");
    const methodPaypal = document.getElementById("methodPaypal");
    const methodPeoplesPay = document.getElementById("methodPeoplesPay");
    const methodEzcash = document.getElementById("methodEzcash");

    const cardFormSection = document.getElementById("cardFormSection");
    const paypalSection = document.getElementById("paypalSection");
    const peoplesPaySection = document.getElementById("peoplesPaySection");
    const ezcashSection = document.getElementById("ezcashSection");

    const paymentForm = document.getElementById("paymentForm");

    // அனைத்து படிவங்களையும் மறைக்கும் செயல்பாடு
    function hideAllSections() {
        cardFormSection.classList.add("d-none");
        paypalSection.classList.add("d-none");
        peoplesPaySection.classList.add("d-none");
        ezcashSection.classList.add("d-none");

        // முந்தைய 'required' பண்புகளை நீக்குதல் (Validation-க்காக)
        setRequiredFields(false);
    }

    // தேவையான படிவங்களுக்கு மட்டும் 'required' கொடுப்பது
    function setRequiredFields(isCard) {
        const cardInputs = cardFormSection.querySelectorAll("input");
        cardInputs.forEach(input => {
            if(isCard) input.setAttribute("required", "true");
            else input.removeAttribute("required");
        });
    }

    // ஒவ்வொரு முறை பட்டனை கிளிக் செய்யும் போதும் படிவங்களை மாற்றுதல்
    methodCard.addEventListener("change", function() {
        hideAllSections();
        if(this.checked) {
            cardFormSection.classList.remove("d-none");
            setRequiredFields(true);
        }
    });

    methodPaypal.addEventListener("change", function() {
        hideAllSections();
        if(this.checked) paypalSection.classList.remove("d-none");
    });

    methodPeoplesPay.addEventListener("change", function() {
        hideAllSections();
        if(this.checked) peoplesPaySection.classList.remove("d-none");
    });

    methodEzcash.addEventListener("change", function() {
        hideAllSections();
        if(this.checked) ezcashSection.classList.remove("d-none");
    });

    // படிவத்தை சமர்ப்பிக்கும் போது (Form Submission) நடக்கும் செயல்
    paymentForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("உங்கள் கட்டண செயல்முறை வெற்றிகரமாக செயலாக்கப்படுகிறது! நன்றி.");
    });
});