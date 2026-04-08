import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const [darkMode, setDarkMode] = useState(false);

  const [students, setStudents] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const isAdmin = true; // change to false to hide admin panel

  const features = [
    { name: "Emotion Detection", link: "/sentiment", emoji: "😊" },
    { name: "AI Chat Support", link: "/chat", emoji: "🤖" },
    { name: "Academic Performance", link: "/performance", emoji: "📊" },
    { name: "Study Reminder", link: "/reminder", emoji: "⏰" },
    { name: "Teacher Feedback", link: "/feedback", emoji: "📝" },
    { name: "Emergency Support", link: "/emergency", emoji: "🚨" }
  ];

  if (isAdmin) {
    features.push({ name: "Admin Panel", link: "/admin", emoji: "⚙️" });
  }

  const chartData = [
    { name: "Mon", students: 20 },
    { name: "Tue", students: 40 },
    { name: "Wed", students: 35 },
    { name: "Thu", students: 50 },
    { name: "Fri", students: 70 },
  ];

  // Animated counters

  useEffect(() => {

    const counter = setInterval(() => {

      setStudents((prev) => (prev < 120 ? prev + 2 : prev));
      setFeedback((prev) => (prev < 80 ? prev + 1 : prev));
      setActiveUsers((prev) => (prev < 45 ? prev + 1 : prev));

    }, 40);

    return () => clearInterval(counter);

  }, []);

  return (

    <div className={darkMode ? "bg-gray-900 text-white flex" : "bg-gray-100 text-black flex"}>

      {/* Sidebar */}

      <div className="w-64 min-h-screen bg-purple-700 text-white p-6">

        <h2 className="text-2xl font-bold mb-8">🎓 Student Companion</h2>

        <ul className="space-y-4">

          {features.map((item, index) => (

            <li key={index}>
              <a
                href={item.link}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-500 transition"
              >
                <span className="text-xl">{item.emoji}</span>
                {item.name}
              </a>
            </li>

          ))}

        </ul>

      </div>

      {/* Main Section */}

      <div className="flex-1 p-8">

        {/* Navbar */}

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <img
              src="https://images.scalebranding.com/technology-human-head-logo-24c353b0-9efe-43c7-ae78-8cbae3183558.png"
              alt="profile"
              className="rounded-full"
              width={60}
            />

          </div>

        </div>

        {/* Counters */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold text-purple-600">{students}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-lg font-semibold">Teacher Feedback</h3>
            <p className="text-3xl font-bold text-purple-600">{feedback}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold text-purple-600">{activeUsers}</p>
          </div>

        </div>

        {/* Chart */}

        <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

          <h2 className="text-xl font-bold mb-4">
            Weekly Student Activity
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="students" />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">

          {features.map((item, index) => (

            <a
              key={index}
              href={item.link}

              className="group bg-gradient-to-r from-purple-500 to-pink-500
              text-white rounded-2xl shadow-xl p-8

              transform transition duration-500
              hover:scale-110 hover:rotate-1
              hover:shadow-2xl"

            >

              <div className="text-5xl mb-4 group-hover:rotate-12 transition">
                {item.emoji}
              </div>

              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

            </a>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;