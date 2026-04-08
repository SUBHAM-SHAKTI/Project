import React, { useState } from "react";

function ChatSupport() {

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [typing, setTyping] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.onresult = (event) => {
      try {
        setMessage(event.results[0][0].transcript);
      } catch (error) {
        console.log("Voice error:", error);
      }
    };
  }

  const startVoice = () => {
    try {
      if (recognition) recognition.start();
    } catch (error) {
      console.log("Voice start error:", error);
    }
  };

  const techQA = {

    "what is react": "React is a JavaScript library used to build user interfaces.",
    "what is javascript": "JavaScript is a programming language used to make websites interactive.",
    "what is python": "Python is a high-level programming language used for AI and automation.",
    "what is java": "Java is an object-oriented programming language.",
    "what is html": "HTML stands for HyperText Markup Language.",
    "what is css": "CSS stands for Cascading Style Sheets.",
    "what is node": "Node.js allows JavaScript to run on servers.",
    "what is mongodb": "MongoDB is a NoSQL database storing JSON data.",
    "what is mern": "MERN stack = MongoDB + Express + React + Node.",
    "what is ai": "Artificial Intelligence simulates human intelligence."
  };

  const generateReply = (msg) => {

    const text = msg.toLowerCase();

    for (let question in techQA) {
      if (text.includes(question)) {
        return techQA[question];
      }
    }

    if (text.includes("name")) {
      return "My name is Student Companion AI 🤖";
    }

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello 👋 How can I help you today?";
    }

    if (text.includes("stress")) {
      return "Take a short break and relax 🧘";
    }

    return "Ask me about React, JavaScript, Python, MERN, HTML, CSS etc 📚";
  };

  const sendMessage = () => {

    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };

    setChatHistory(prev => [...prev, userMessage]);

    setTyping(true);

    setTimeout(() => {

      const botReply = generateReply(message);

      setChatHistory(prev => [
        ...prev,
        { sender: "bot", text: botReply }
      ]);

      setTyping(false);

    }, 1200);

    setMessage("");
  };

  return (

    <div
      className="relative flex items-center justify-center min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1677442136019-21780ecad995')"
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* AI Glow Effects */}
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

      <div className="relative bg-white/20 backdrop-blur-xl border border-white/30
      shadow-2xl rounded-2xl p-6 w-full max-w-md text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          🤖 AI Chat Support
        </h2>

        {/* Chat Area */}

        <div className="h-80 overflow-y-auto space-y-3 mb-4 p-3 
        bg-white/10 rounded-xl">

          {chatHistory.map((chat, index) => (

            <div
              key={index}
              className={`flex ${chat.sender === "user"
                ? "justify-end"
                : "justify-start"}`}
            >

              <span
                className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow
                ${chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"}`}
              >

                {chat.text}

              </span>

            </div>

          ))}

          {typing && (

            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl animate-pulse">
              🤖 Typing...
            </span>

          )}

        </div>

        {/* Emoji reactions */}

        <div className="flex gap-2 mb-3 justify-center text-xl">
          <button onClick={() => setMessage(message + " 😊")}>😊</button>
          <button onClick={() => setMessage(message + " 👍")}>👍</button>
          <button onClick={() => setMessage(message + " 📚")}>📚</button>
          <button onClick={() => setMessage(message + " 😢")}>😢</button>
        </div>

        {/* Input */}

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Ask your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-lg px-3 py-2 text-black
            focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={startVoice}
            className="bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600"
          >
            🎤
          </button>

          <button
            onClick={sendMessage}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );
}

export default ChatSupport;