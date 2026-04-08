import React, { useState, useEffect } from "react";

function TeacherFeedback() {

  const [studentName, setStudentName] = useState("");
  const [regdNo, setRegdNo] = useState("");

  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [history, setHistory] = useState([]);

  const [error, setError] = useState(false);

  const teachers = [
    "Dr. Subham Shakti Singh",
    "Dr. Somya Ranjan",
    "Mr. Virat K",
    "Ms. Patel",
    "Dr. Reddy"
  ];

  const subjects = [
    "DBMS",
    "Operating System",
    "IoT",
    "Java",
    "MERN Stack",
    "Python",
    "Computer Networks"
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("teacherFeedback")) || [];
    setHistory(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("teacherFeedback", JSON.stringify(history));
  }, [history]);

  const analyzeSentiment = (text) => {

    const lower = text.toLowerCase();

    if (
      lower.includes("good") ||
      lower.includes("excellent") ||
      lower.includes("great")
    )
      return "Positive 😊";

    if (
      lower.includes("bad") ||
      lower.includes("poor") ||
      lower.includes("problem")
    )
      return "Negative 😔";

    return "Neutral 😐";
  };

  const submitFeedback = () => {

    if (!studentName || !regdNo || !teacher || !subject || feedback.trim() === "") {

      setError(true);
      setTimeout(() => setError(false), 500);
      alert("⚠ Student Name and Regd No are mandatory!");
      return;
    }

    const sentiment = analyzeSentiment(feedback);

    const newFeedback = {
      studentName,
      regdNo,
      teacher,
      subject,
      text: feedback,
      rating,
      sentiment
    };

    setHistory([newFeedback, ...history]);

    setStudentName("");
    setRegdNo("");
    setTeacher("");
    setSubject("");
    setFeedback("");
    setRating(0);
  };

  return (

    <div
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')"
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated Background */}
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

      <div className={`relative bg-white/20 backdrop-blur-xl border border-white/30
      shadow-2xl rounded-3xl p-8 w-full max-w-md text-white
      transition duration-500 hover:scale-105
      ${error ? "animate-bounce" : ""}`}>

        <h2 className="text-3xl font-bold text-center mb-2">
          🤖 AI Teacher Feedback
        </h2>

        <p className="text-center text-sm mb-6 opacity-80">
          Smart student feedback analysis system
        </p>

        <input
          type="text"
          placeholder="Student Name *"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black
          focus:ring-2 focus:ring-pink-400 transition"
        />

        <input
          type="text"
          placeholder="Registration Number *"
          value={regdNo}
          onChange={(e) => setRegdNo(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black
          focus:ring-2 focus:ring-pink-400 transition"
        />

        <select
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg text-black"
        >
          <option value="">Select Subject</option>
          {subjects.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <div className="flex justify-center mb-4 space-x-2">

          {[1,2,3,4,5].map((star) => (

            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-3xl transition-all duration-300
              hover:scale-125
              ${star <= rating ? "text-yellow-400 drop-shadow-lg" : "text-gray-300"}`}
            >
              ⭐
            </span>

          ))}

        </div>

        <textarea
          value={feedback}
          placeholder="Write your feedback..."
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded-lg text-black h-32
          focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4 transition"
        />

        <button
          onClick={submitFeedback}
          className="w-full bg-pink-600 py-2 rounded-lg
          hover:bg-pink-700 transition transform hover:scale-105
          shadow-lg"
        >
          🚀 Submit Feedback
        </button>

        {history.length > 0 && (

          <div className="mt-6 bg-white/10 p-4 rounded-xl">

            <h3 className="font-semibold mb-2">
              📊 Feedback History
            </h3>

            <div className="max-h-40 overflow-y-auto text-sm space-y-2">

              {history.map((item, index) => (

                <div
                  key={index}
                  className="bg-white/10 p-2 rounded-lg
                  transition hover:bg-white/20 hover:scale-105"
                >

                  <p className="font-semibold text-green-300">
                    👨‍🎓 {item.studentName} ({item.regdNo})
                  </p>

                  <p className="font-semibold">
                    👨‍🏫 {item.teacher} — {item.subject}
                  </p>

                  <p>{item.text}</p>

                  <div className="flex justify-between text-xs mt-1">

                    <span>
                      {"⭐".repeat(item.rating)}
                    </span>

                    <span>
                      {item.sentiment}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default TeacherFeedback;