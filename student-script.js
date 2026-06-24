// Sample Mock Database Object Structure for Interactive Profile Changes
const mockStudentDB = {
    "STU001": {
        name: "Alex Morgan",
        class: "Grade 10-A",
        rollNo: "14",
        email: "alex@example.com",
        phone: "+1 555-0199",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
        marks: [
            { subject: "Mathematics", max: 100, obtained: 92, grade: "A+", status: "Pass" },
            { subject: "Science", max: 100, obtained: 85, grade: "A", status: "Pass" },
            { subject: "English Lit.", max: 100, obtained: 78, grade: "B+", status: "Pass" }
        ],
        fees: [
            { month: "June 2026", amount: "$150.00", date: "2026-06-10", inv: "#INV-9081", status: "Paid" },
            { month: "May 2026", amount: "$150.00", date: "2026-05-04", inv: "#INV-8832", status: "Paid" },
            { month: "April 2026", amount: "$150.00", date: "--", inv: "--", status: "Pending" }
        ]
    },
    "STU002": {
        name: "David Miller",
        class: "Grade 10-B",
        rollNo: "09",
        email: "david.m@example.com",
        phone: "+1 555-0144",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
        marks: [
            { subject: "Mathematics", max: 100, obtained: 65, grade: "C", status: "Pass" },
            { subject: "Science", max: 100, obtained: 42, grade: "E", status: "Pass" },
            { subject: "English Lit.", max: 100, obtained: 88, grade: "A", status: "Pass" }
        ],
        fees: [
            { month: "June 2026", amount: "$150.00", date: "--", inv: "--", status: "Pending" },
            { month: "May 2026", amount: "$150.00", date: "2026-05-02", inv: "#INV-8711", status: "Paid" },
            { month: "April 2026", amount: "$150.00", date: "2026-04-05", inv: "#INV-8490", status: "Paid" }
        ]
    }
};

// Function to switch view datasets dynamically
function viewStudent(studentId) {
    const data = mockStudentDB[studentId];
    if(!data) return;

    // Update Banner Elements
    document.getElementById("detailName").innerText = data.name;
    document.getElementById("detailAvatar").src = data.avatar;
    document.getElementById("detailName").parentNode.querySelector("p").innerHTML = `<i class="fas fa-graduation-cap me-2"></i>Class: ${data.class} | Roll No: ${data.rollNo}`;
    
    const badges = document.getElementById("detailName").parentNode.querySelectorAll(".badge");
    badges[0].innerHTML = `<i class="fas fa-envelope me-1"></i>${data.email}`;
    badges[1].innerHTML = `<i class="fas fa-phone me-1"></i>${data.phone}`;

    // Update Marks Table
    const marksBody = document.getElementById("marksTableBody");
    marksBody.innerHTML = "";
    data.marks.forEach(item => {
        marksBody.innerHTML += `
            <tr>
                <td class="fw-semibold">${item.subject}</td>
                <td>${item.max}</td>
                <td class="fw-bold text-primary">${item.obtained}</td>
                <td>${item.grade}</td>
                <td><span class="badge ${item.status === 'Pass' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger'} px-2">${item.status}</span></td>
            </tr>`;
    });

    // Update Fees Table
    const feesBody = document.getElementById("feesTableBody");
    feesBody.innerHTML = "";
    data.fees.forEach(item => {
        feesBody.innerHTML += `
            <tr>
                <td class="fw-semibold">${item.month}</td>
                <td>${item.amount}</td>
                <td>${item.date}</td>
                <td><code class="text-muted">${item.inv}</code></td>
                <td><span class="badge ${item.status === 'Paid' ? 'bg-success' : 'bg-danger'}">${item.status}</span></td>
            </tr>`;
    });

    // Toggle selected list visualization classes
    const listButtons = document.querySelectorAll("#studentList button");
    listButtons.forEach(btn => btn.classList.remove("active-student"));
    event.currentTarget.classList.add("active-student");
}

// Simple layout search match validation rules
document.getElementById("searchStudent").addEventListener("input", function(e){
    const filter = e.target.value.toLowerCase().trim();
    const listItems = document.querySelectorAll("#studentList button");

    listItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(filter) ? "block" : "none";
    });
});

// Form Submission intercept preventer
document.getElementById("addStudentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Form submission successful! Student recorded in cache layout context safely.");
    bootstrap.Modal.getInstance(document.getElementById('addStudentModal')).hide();
});