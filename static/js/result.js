// ============================
// Voice Assistant
// ============================

function playVoiceSummary(text){

    if(!text){
        alert("Voice summary not available");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "te-IN";   // Telugu
    speech.rate = 0.9;
    speech.pitch = 1;

    speechSynthesis.cancel();   // stop previous speech
    speechSynthesis.speak(speech);

}


// ============================
// Load Brand Suggestions
// ============================

fetch("/api/brands")
.then(res => res.json())
.then(brands => {

    const grid = document.getElementById("brandsGrid");

    if(!grid) return;

    if(brands.length === 0){

        grid.innerHTML = `
        <p style="text-align:center;color:#666">
        No pesticide recommendation available
        </p>
        `;
        return;
    }

    grid.innerHTML = brands.map(b => `
        <div class="brand-card">

            <img src="${b.image}" style="width:100%;height:150px;object-fit:contain;margin-bottom:10px">

            <h4>${b.name}</h4>

            <p>${b.company}</p>

            <span class="price">${b.price}</span>

            <div class="rating">${"★".repeat(Math.floor(b.rating))}</div>

            <a href="${b.link}" target="_blank" class="btn btn-primary"
            style="margin-top:10px;display:block;text-align:center">

            Buy on Amazon

            </a>

        </div>
    `).join("");

})
.catch(err=>{
    console.error("Brand loading error:",err);
});

// ============================
// Share Result
// ============================

function shareResult(){

    if(navigator.share){

        navigator.share({
            title:"Leaf Disease Detection",
            text:"AI predicted disease for my crop leaf",
            url:window.location.href
        });

    }else{
        alert("Sharing not supported on this browser");
    }

}


// ============================
// Save Report
// ============================

function saveReport(){

    window.print();

}