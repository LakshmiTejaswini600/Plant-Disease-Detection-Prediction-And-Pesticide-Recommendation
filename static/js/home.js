// =============================
// Animated Stats Counter
// =============================
document.addEventListener("DOMContentLoaded", () => {

    const stats = document.querySelectorAll(".stat-number");

    const animateCounter = (el, target) => {

        let count = 0;
        const speed = target / 100;

        const update = () => {

            count += speed;

            if (count >= target) {
                el.textContent = target;
            } else {
                el.textContent = Math.floor(count);
                requestAnimationFrame(update);
            }
        };

        update();
    };

    stats.forEach(stat => {

        const target = parseInt(stat.dataset.target);

        if (!isNaN(target)) {
            animateCounter(stat, target);
        }

    });

});
function calculatePesticide(){

    const acres = document.getElementById("landArea").value;

    const mancozeb = acres * 800;

    const water = acres * 200;

    document.getElementById("calcResult").innerHTML = `
        <p>Mancozeb Required: <b>${mancozeb} g</b></p>
        <p>Water Required: <b>${water} L</b></p>
    `;

}


// =============================
// Weather Widget
// =============================
// fetch("/api/weather")
// .then(res => res.json())
// .then(data => {

//     const widget = document.getElementById("weather-widget");

//     if(!widget) return;

//     widget.innerHTML = `
//         <div class="weather-info">
//             <i class="fas fa-cloud-sun"></i>
//             <span>${data.temperature} | ${data.humidity} | ${data.condition}</span>
//             <span class="spray-advice">✓ ${data.spray_advice}</span>
//         </div>
//     `;
// })
// .catch(err => {
//     console.error("Weather API error:", err);
// });


// =============================
// Load Brands
// =============================
fetch("/api/brands")
.then(res => res.json())
.then(brands => {

    const container = document.getElementById("brands-container");

    if(!container) return;

    container.innerHTML = brands.map(b => `
        <div class="brand-card">
            <h4>${b.name}</h4>
            <p>${b.company}</p>
            <span class="price">${b.price}</span>
            <div class="rating">${"★".repeat(Math.floor(b.rating))}</div>
        </div>
    `).join("");

})
.catch(err => {
    console.error("Brand API error:", err);
});


// =============================
// Testimonial Rotation
// =============================

let currentTestimonial = 0;

const testimonials = document.querySelectorAll(".testimonial");

if(testimonials.length > 0){

    testimonials.forEach((t,i)=>{
        t.style.display = i===0 ? "block" : "none";
    });

    setInterval(()=>{

        testimonials[currentTestimonial].style.display="none";

        currentTestimonial =
            (currentTestimonial + 1) % testimonials.length;

        testimonials[currentTestimonial].style.display="block";

    },5000);
}