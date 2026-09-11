import os
import json
import numpy as np
import tensorflow as tf
from flask import Flask, render_template, request, jsonify, url_for
from PIL import Image

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

IMG_SIZE = 224

# Load model
model = tf.keras.models.load_model("best_leaf_model.keras", compile=False)

# Load class labels
with open("class_labels.json") as f:
    class_labels = json.load(f)
class_names = list(class_labels.keys())

# Load disease info
with open("disease_info.json", encoding="utf-8") as f:
    disease_info = json.load(f)


# Image preprocessing
def preprocess(img_path):
    img = Image.open(img_path).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img


# Severity logic
def severity_level(conf):
    if conf < 0.4:
        return {"level": "Mild", "color": "green", "icon": "🟢"}
    elif conf < 0.75:
        return {"level": "Moderate", "color": "orange", "icon": "🟡"}
    else:
        return {"level": "Severe", "color": "red", "icon": "🔴"}


# Home page
@app.route("/")
def index():
    return render_template("index.html")
#about page 
@app.route("/about")
def about():
    return render_template("about.html")

# Scan page
@app.route("/scan", methods=["GET", "POST"])
def scan():

    if request.method == "GET":
        return render_template("scan.html")

    file = request.files["file"]
    acres = float(request.form.get("acres", 1))

    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    img = preprocess(path)

    preds = model.predict(img)[0]
    idx = np.argmax(preds)

    predicted_class = class_names[idx]
    confidence = float(preds[idx])

    info = disease_info.get(predicted_class, {})

    severity = severity_level(confidence)

    result = {
        "class": predicted_class,
        "confidence": confidence,
        "image_path": "/" + path,
        "disease_data": info,
        "severity": severity,
        "acres": acres
    }

    with open("temp_result.json", "w", encoding="utf-8") as f:
        json.dump(result, f)

    return jsonify({
        "success": True,
        "redirect": url_for("result")
    })


# Result page
@app.route("/result")
def result():

    with open("temp_result.json", encoding="utf-8") as f:
        prediction = json.load(f)

    return render_template("result.html", prediction=prediction)


# Weather API
@app.route("/api/weather")
def weather():
    return jsonify({
        "temperature": "30°C",
        "humidity": "60%",
        "condition": "Partly Cloudy",
        "spray_advice": "Good weather for spraying"
    })


@app.route("/api/brands")
def brands():

    try:
        with open("temp_result.json", encoding="utf-8") as f:
            result = json.load(f)

        disease_data = result.get("disease_data", {})
        pesticides = disease_data.get("pesticide_recommendation", [])

        brand_db = {
            "Mancozeb": {
                "name": "Mancozeb",
                "company": "Indofil",
                "price": "₹350",
                "rating": 4.5,
                "image": "static\images\mancob.jpg",
                "link": "https://www.amazon.in/s?k=mancozeb+fungicide"
            },
            "Copper Oxychloride": {
                "name": "Copper Oxychloride",
                "company": "Tata",
                "price": "₹420",
                "rating": 4.4,
                "image": "static\images\tata.jpg",
                "link": "https://www.amazon.in/s?k=copper+oxychloride"
            },
            "Metalaxyl": {
                "name": "Metalaxyl",
                "company": "Syngenta",
                "price": "₹580",
                "rating": 4.6,
                "image": "static\images\metalxy.jpg",
                "link": "https://www.amazon.in/s?k=metalaxyl+fungicide"
            },
            "Chlorothalonil": {
                "name": "Chlorothalonil",
                "company": "KAVACH",
                "price": "₹450",
                "rating": 4.3,
                "image": "static\images\kavach.jpg",
                "link": "https://www.amazon.in/s?k=chlorothalonil"
            },
            "Captan": {
                "name": "Captan",
                "company": "Adama",
                "price": "₹390",
                "rating": 4.2,
                "image": "static\images\adama.jpg",
                "link": "https://www.amazon.in/s?k=captan+fungicide"
            }
        }

        brands = []

        for p in pesticides:

            # remove % and dosage
            clean_name = p.split()[0]

            if clean_name in brand_db:
                brands.append(brand_db[clean_name])

        return jsonify(brands)

    except Exception as e:
        return jsonify([])


if __name__ == "__main__":
    app.run(debug=True)