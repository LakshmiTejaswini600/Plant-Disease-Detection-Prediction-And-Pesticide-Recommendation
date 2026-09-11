// Main JS for KrishiAI

console.log("Plant leaf Disease system loaded successfully");

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// Simple mobile menu handling (if added later)
function toggleMenu() {
    const menu = document.querySelector(".nav-menu");
    if (menu) {
        menu.classList.toggle("active");
    }
}
