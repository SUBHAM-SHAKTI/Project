import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
// import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import SentimentAnalysis from "./components/SentimentAnalysis";
import ChatSupport from "./components/ChatSupport";
import PerformanceTracker from "./components/PerformanceTracker";
// import Suggestions from "./components/Suggestions";
import StudyReminder from "./components/StudyReminder";
import TeacherFeedback from "./components/TeacherFeedback";
import EmergencySupport from "./components/EmergencySupport";
import AdminPanel from "./components/AdminPanel";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sentiment" element={<SentimentAnalysis />} />
        <Route path="/chat" element={<ChatSupport />} />
        <Route path="/performance" element={<PerformanceTracker />} />
        {/* <Route path="/suggestions" element={<Suggestions />} /> */}
        <Route path="/reminder" element={<StudyReminder />} />
        <Route path="/feedback" element={<TeacherFeedback />} />
        <Route path="/emergency" element={<EmergencySupport />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App
