import React, { useState, useEffect } from "react";

function StudyReminder() {

  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [performance, setPerformance] = useState("");
  const [time, setTime] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studyTasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
    localStorage.setItem("adminStudyData", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {

    if (student === "" || subject === "") return;

    const newTask = {
      student,
      subject,
      teacher,
      performance,
      time,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setStudent("");
    setSubject("");
    setTeacher("");
    setPerformance("");
    setTime("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (

<div
className="relative min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')"
}}
>

{/* Dark overlay */}
<div className="absolute inset-0 bg-black/60"></div>

{/* Study glow effects */}
<div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
<div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

<div className="relative bg-white/20 backdrop-blur-xl border border-white/30
shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">

<h2 className="text-3xl font-bold text-center mb-6">
⏰ Study Reminder
</h2>

{/* Input Section */}

<div className="flex flex-col gap-2 mb-4">

<input
value={student}
onChange={(e) => setStudent(e.target.value)}
placeholder="Student Name"
className="px-3 py-2 rounded-lg text-black"
/>

<select
value={subject}
onChange={(e) => setSubject(e.target.value)}
className="px-3 py-2 rounded-lg text-black"
>
<option value="">Select Subject</option>
<option>MERN</option>
<option>Java</option>
<option>Python</option>
<option>DBMS</option>
<option>IoT</option>
<option>OS</option>
</select>

<input
value={teacher}
onChange={(e) => setTeacher(e.target.value)}
placeholder="Teacher Guide"
className="px-3 py-2 rounded-lg text-black"
/>

<select
value={performance}
onChange={(e) => setPerformance(e.target.value)}
className="px-3 py-2 rounded-lg text-black"
>
<option value="">Performance</option>
<option>Excellent</option>
<option>Good</option>
<option>Average</option>
<option>Needs Improvement</option>
</select>

<input
type="time"
value={time}
onChange={(e) => setTime(e.target.value)}
className="px-3 py-2 rounded-lg text-black"
/>

<button
onClick={addTask}
className="bg-purple-600 py-2 rounded-lg
hover:bg-purple-700 transition transform hover:scale-105"
>
➕ Add Study Plan
</button>

</div>

{/* Task List */}

<ul className="space-y-2 max-h-60 overflow-y-auto">

{tasks.map((t, i) => (

<li
key={i}
className={`p-3 rounded-lg
${t.completed ? "bg-green-400/30" : "bg-white/10"}`}
>

<div
onClick={() => toggleTask(i)}
className={`cursor-pointer ${t.completed ? "line-through" : ""}`}
>

👩‍🎓 {t.student} <br/>

📚 {t.subject} <br/>

👨‍🏫 Guide: {t.teacher} <br/>

⭐ Performance: {t.performance} <br/>

⏰ {t.time}

</div>

<button
onClick={() => deleteTask(i)}
className="text-red-300 hover:text-red-500 mt-2"
>
❌ Delete
</button>

</li>

))}

</ul>

</div>

</div>

  );
}

export default StudyReminder;