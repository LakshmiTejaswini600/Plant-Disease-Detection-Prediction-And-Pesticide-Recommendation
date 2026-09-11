# 🌿 Plant Leaf Disease Detection and Advisory System

## 📌 Project Overview

An AI-based web application that detects plant leaf diseases from uploaded leaf images using a deep learning model. The system provides disease information along with symptoms, causes, prevention methods, and recommended treatments to help farmers and users make better crop-management decisions.

## ✨ Features

* 🌱 Plant leaf disease detection using deep learning
* 📷 Upload and scan leaf images
* 🤖 AI-based disease prediction
* 📊 Prediction result with confidence
* 🩺 Disease symptoms and causes
* 🛡️ Disease prevention methods
* 💊 Chemical and organic treatment recommendations
* 🌐 User-friendly web interface
* 📱 Responsive design

## 🛠️ Technologies Used

* **Python**
* **TensorFlow / Keras**
* **Flask**
* **HTML5**
* **CSS3**
* **JavaScript**
* **NumPy**
* **Pillow**
* **Bootstrap**

## 🧠 Machine Learning Model

The project uses a deep learning image-classification model trained to identify different plant leaf diseases. The trained model is integrated into the Flask web application to process uploaded images and generate disease predictions.

## 📂 Project Structure

```text
plantleafdisease/
│
├── app.py
├── best_leaf_model.h5
├── best_leaf_model.keras
├── class_labels.json
├── disease_info.json
│
├── static/
│   ├── css/
│   │   ├── home.css
│   │   ├── result.css
│   │   ├── scan.css
│   │   └── style.css
│   │
│   ├── images/
│   └── js/
│       ├── home.js
│       ├── main.js
│       ├── result.js
│       └── scan.js
│
└── templates/
    ├── about.html
    ├── base.html
    ├── index.html
    ├── result.html
    └── scan.html
```

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/LakshmiTejaswini600/plantleafdisease.git
```

### 2. Open the Project Folder

```bash
cd plantleafdisease
```

### 3. Install Required Libraries

```bash
pip install flask tensorflow numpy pillow
```

### 4. Run the Application

```bash
python app.py
```

### 5. Open in Browser

```text
http://127.0.0.1:5000
```

## 🔄 Working Process

```text
Upload Leaf Image
       ↓
Image Preprocessing
       ↓
Deep Learning Model
       ↓
Disease Prediction
       ↓
Display Disease Information
       ↓
Symptoms / Cause / Prevention / Treatment
```

## 🎯 Project Objective

The objective of this project is to provide an easy-to-use AI-based solution for identifying plant leaf diseases and providing useful advisory information. It helps users detect diseases at an early stage and understand suitable prevention and treatment methods.

## 👩‍💻 Developer

**Lakshmi Tejaswini**

B.Tech – Computer Science and Engineering

## 📄 License

This project is developed for educational and portfolio purposes.
