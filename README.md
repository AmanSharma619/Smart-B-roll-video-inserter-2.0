# Smart B-Roll Video Inserter 🎬

Smart B-Roll Video Inserter is a full-stack application that automatically inserts relevant **B-roll clips** into an **A-roll video** using AI-based context understanding and video processing.

The system analyzes:

* **A-roll video (with audio)** to understand spoken context
* **B-roll videos (audio-less)** to understand visual context
  and intelligently generates a **timeline** to insert the most relevant B-roll clips.

---

## 🚀 Features

* 🎙️ Speech-to-text transcription using OpenAI (Whisper)
* 🖼️ Visual context extraction for audio-less B-rolls using Gemini
* 🧠 AI-based timeline planning using OpenAI
* ⚙️ Node.js + Express backend
* ⚡ Vite-powered frontend

---

## 🗂️ Project Structure

```
Smart B-roll video inserter/
│
├── backend/
│   ├── services/
│   ├── uploads/         # Temporary uploaded files 
│   └── mainroute.js
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## 🧑‍💻 Tech Stack

### Frontend

* Vite
* React
* Runs on **[http://localhost:5173](http://localhost:5173)**

### Backend

* Node.js
* Express.js
* FFmpeg
* Gemini and OpenAI APIs for planning & context matching


## ▶️ Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AmanSharma619/Smart-B-roll-video-inserter-2.0.git
cd Smart-B-roll-video-inserter-2.0
```

---

## ⚙️ Backend Setup

### 📦 Prerequisites

Ensure the following are installed and available in PATH:

* **Node.js** (v18 or later)
* **FFmpeg**

Verify installations:

```bash
node -v
ffmpeg -version
```

---

### 📁 Navigate to Backend

```bash
cd backend
```

---

### 📥 Install Node Dependencies

```bash
npm install
```

---

---

### 🔑 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
OPENAI_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

---

### ▶️ Start the Backend Server

```bash
nodemon ./mainroute.js
```

Backend will run on:

```
http://localhost:3000
```

---

## 🌐 Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🧠 How It Works (High-Level)

1. User uploads:

   * One **A-roll video**
   * Multiple **B-roll videos**
2. Backend extracts audio using FFmpeg
3. OpenAI(Whisper) transcribes A-roll speech
4. B-roll visuals are analyzed for context by Gemini
5. OpenAI generates a **timeline plan**
6. Backend processes and finalizes the plan

---
