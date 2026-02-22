

# AI-Powered Zoom Class Transcriber & Task Tracker

![AI Zoom Transcriber](https://img.shields.io/badge/AI-Powered-DeepSkyBlue) ![Python](https://img.shields.io/badge/Python-3.10-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-0.95-green) ![React](https://img.shields.io/badge/React-18-blueviolet)

A smart web application that **records, transcribes, and analyzes Zoom or online class recordings** using AI. It not only provides accurate transcripts but also automatically detects tasks or assignments mentioned during the session and tracks them in a task dashboard.

---

## Features

*  **Audio Recording & Upload** – Upload Zoom or lecture recordings in common audio formats.
*  **AI-Powered Transcription** – Uses OpenAI’s Whisper model to generate accurate text transcripts.
*  **Automatic Task Extraction** – Detects assignments, homework, projects, or deadlines mentioned during the lecture.
*  **Deadline Parsing** – Identifies dates and deadlines using AI-based NLP techniques.
*  **Task Management Dashboard** – View, track, and mark tasks as completed.
*  **Download Transcript** – Save the full lecture transcript as a `.txt` file.
*  **SPA Frontend & FastAPI Backend** – Modern web interface with a REST API backend.

---

## Installation

### Backend setup

1. Make sure Python 3.10+ is installed.
2. Install dependencies:

```bash
pip install fastapi uvicorn pymongo whisper spacy dateparser
python -m spacy download en_core_web_sm
```

3. Run the backend:

```bash
uvicorn main:app --reload
```

### Frontend setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies and start the app:

```bash
npm install
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to access the app.

---

## Usage

1. Upload your Zoom recording via the web interface.
2. The AI transcribes the audio into text.
3. Any tasks or deadlines mentioned in the lecture are automatically added to the **task bar**.
4. Download the transcript as a `.txt` file for offline reference.
5. Mark tasks as complete when done, and track progress in the dashboard.

---

## Tech Stack

* **Backend**: Python, FastAPI, Whisper, spaCy, dateparser, MongoDB
* **Frontend**: React.js
* **AI / NLP**: OpenAI Whisper, spaCy, dateparser
* **Database**: MongoDB

---

## Future Enhancements

* Add **semantic task detection** using Hugging Face Transformers.
* Support **real-time transcription** while attending Zoom classes.
* Enable **multi-language support**.
* Integrate **calendar reminders** for extracted tasks.

---


