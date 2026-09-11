const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");

const previewArea = document.getElementById("previewArea");
const previewImage = document.getElementById("previewImage");

const analyzeBtn = document.getElementById("analyzeBtn");
const loadingAnimation = document.getElementById("loadingAnimation");


// ==========================
// Drag & Drop
// ==========================

uploadArea.addEventListener("dragover", e=>{
    e.preventDefault();
    uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", ()=>{
    uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", e=>{

    e.preventDefault();
    uploadArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];

    if(file && file.type.startsWith("image/")){
        handleFile(file);
    }else{
        alert("Please upload a valid image file");
    }

});


// ==========================
// File Selection
// ==========================

fileInput.addEventListener("change", e=>{
    const file = e.target.files[0];

    if(file){
        handleFile(file);
    }
});


function handleFile(file){

    if(file.size > 16*1024*1024){
        alert("File too large (max 16MB)");
        return;
    }

    const reader = new FileReader();

    reader.onload = e => {

        previewImage.src = e.target.result;

        uploadArea.style.display="none";
        previewArea.style.display="block";
        analyzeBtn.style.display="block";

    };

    reader.readAsDataURL(file);

    window.selectedFile = file;
}


// ==========================
// Reset Upload
// ==========================

function resetUpload(){

    uploadArea.style.display="block";
    previewArea.style.display="none";
    analyzeBtn.style.display="none";

    fileInput.value="";
    window.selectedFile=null;

}


// ==========================
// Analyze Image
// ==========================

function analyzeImage(){

    if(!window.selectedFile){
        alert("Select an image first");
        return;
    }

    previewArea.style.display="none";
    analyzeBtn.style.display="none";

    loadingAnimation.style.display="block";

    const formData = new FormData();

    formData.append("file",window.selectedFile);

    fetch("/scan",{
        method:"POST",
        body:formData
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){
            window.location.href=data.redirect;
        }else{
            throw new Error("Prediction failed");
        }

    })
    .catch(err=>{
        console.error(err);
        alert("Error analyzing leaf");
        resetUpload();
    })
    .finally(()=>{
        loadingAnimation.style.display="none";
    });

}


// ==========================
// Camera
// ==========================

function openCamera(){

const input = document.getElementById("fileInput");

input.setAttribute("capture","environment");

input.click();

}