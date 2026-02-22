import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [txtFile, setTxtFile] = useState("");

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
    chunksRef.current = [];
    recorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorderRef.current.onstop = async () => {
      setLoading(true);
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], "recording.webm");
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post("http://localhost:3001/upload", formData);
        setText(res.data.text || "");
        setTasks(res.data.tasks || []);
        setTxtFile(res.data.txt_file || "");
      } catch (err) {
        console.error("Error uploading:", err);
      } finally {
        setLoading(false);
      }
    };
    recorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stop();
    setRecording(false);
  };

  const downloadTxt = () => {
    const link = document.createElement("a");
    link.href = `http://127.0.0.1:8000/download/${txtFile}`;
    link.download = txtFile;
    link.click();
  };

  const markDone = async (task) => {
    try {
      await axios.post("http://127.0.0.1:8000/complete", { task: task.task });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: true } : t))
      );
    } catch (err) {
      console.error("Error marking done:", err);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🎙 Echo-Audit</h1>
        <p className="subtitle">Record audio & auto-detect tasks</p>
        <div className="controls">
          {!recording ? (
            <button className="record" onClick={startRecording}>⏺ Start Recording</button>
          ) : (
            <button className="stop" onClick={stopRecording}>⏹ Stop Recording</button>
          )}
        </div>
        {recording && <div className="pulse"></div>}
        {loading && <p className="loading">Transcribing audio… ⏳</p>}

        {text && (
          <>
            <div className="output">
              <h3>Transcript</h3>
              <p>{text}</p>
            </div>
            <button className="download" onClick={downloadTxt}>⬇ Download Transcript</button>
          </>
        )}

        {tasks.length > 0 && (
          <div className="tasks">
            <h3>Tasks</h3>
            {tasks.map((t) => (
              <div key={t._id} className={`task ${t.completed ? "done" : ""}`}>
                <input type="checkbox" checked={t.completed} onChange={() => markDone(t)} />
                {t.task} {t.deadline ? `(Deadline: ${t.deadline})` : ""}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;