import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceTracker() {

  const [studentName, setStudentName] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [college, setCollege] = useState("");
  const [dob, setDob] = useState("");
  const [subject, setSubject] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [idCard, setIdCard] = useState(null);
  const [marksheet, setMarksheet] = useState(null);

  const [unitTests, setUnitTests] = useState({
    Jan:"",Feb:"",Mar:"",Apr:"",May:"",Jun:"",
    Jul:"",Aug:"",Sep:"",Oct:"",Nov:"",Dec:""
  });

  const TOTAL_MARK = 120;

  const subjects = [
    { name: "MERN", score: 85 },
    { name: "Java", score: 78 },
    { name: "Python", score: 90 },
    { name: "DBMS", score: 88 }
  ];

  const updateTest = (month,value)=>{
    setUnitTests({...unitTests,[month]:value});
  };

  const obtainedMarks = Object.values(unitTests).map(v=>Number(v)||0);

  const totalObtained = obtainedMarks.reduce((a,b)=>a+b,0);

  const totalMax = TOTAL_MARK * obtainedMarks.length;

  const percentage = totalMax ? ((totalObtained/totalMax)*100).toFixed(2) : 0;

  const getSuggestion = () => {
    if (percentage > 85) return "🏆 Excellent performance! Keep it up 🚀";
    if (percentage > 70) return "📚 Good progress. Keep improving!";
    return "📅 Focus more on studies and practice.";
  };

  const barData = {
    labels: subjects.map(s=>s.name),
    datasets:[
      {
        label:"Subject Scores",
        data:subjects.map(s=>s.score),
        backgroundColor:"rgba(99,102,241,0.7)"
      }
    ]
  };

  const lineData = {
    labels:Object.keys(unitTests),
    datasets:[
      {
        label:"Unit Test Marks",
        data:obtainedMarks,
        borderColor:"rgba(34,197,94,1)",
        backgroundColor:"rgba(34,197,94,0.3)"
      }
    ]
  };

  const uploadIdCard = (e)=>{
    const file=e.target.files[0];
    if(file && file.size>15*1024*1024){
      alert("File must be under 15MB");
      return;
    }
    setIdCard(file);
  };

  const uploadMarksheet = (e)=>{
    const file=e.target.files[0];
    if(!file) return;

    if(file.size>10*1024*1024){
      alert("File must be under 10MB");
      return;
    }

    setMarksheet(file);
  };

  const submitForm = ()=>{
    if(!studentName || !regdNo || !college){
      alert("Fill required fields");
      return;
    }

    alert(`Student Saved
Subject: ${subject==="Other"?otherSubject:subject}
Total Obtained Marks: ${totalObtained}
Total Marks: ${totalMax}
Percentage: ${percentage}%`);
  };

  return(

<div
className="relative min-h-screen p-8 bg-cover bg-center"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')"
}}
>

{/* Dark overlay */}
<div className="absolute inset-0 bg-black/60"></div>

{/* Animated Glow */}
<div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
<div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

<div className="relative max-w-6xl mx-auto bg-white/20 backdrop-blur-xl
border border-white/30 rounded-3xl p-8 text-white shadow-2xl">

<h2 className="text-3xl font-bold text-center mb-8">
📊 Student Performance Tracker
</h2>

<div className="grid md:grid-cols-2 gap-4 mb-8">

<input
placeholder="Student Name *"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
className="px-3 py-2 rounded text-black"
/>

<input
placeholder="Registration Number *"
value={regdNo}
onChange={(e)=>setRegdNo(e.target.value)}
className="px-3 py-2 rounded text-black"
/>

<input
placeholder="College Name *"
value={college}
onChange={(e)=>setCollege(e.target.value)}
className="px-3 py-2 rounded text-black"
/>

<input
type="date"
value={dob}
onChange={(e)=>setDob(e.target.value)}
className="px-3 py-2 rounded text-black"
/>

<select
value={subject}
onChange={(e)=>setSubject(e.target.value)}
className="px-3 py-2 rounded text-black"
>
<option value="">Select Subject</option>
<option>MERN</option>
<option>Java</option>
<option>Python</option>
<option>DBMS</option>
<option>Other</option>
</select>

{subject==="Other" &&(
<input
placeholder="Enter other subject"
value={otherSubject}
onChange={(e)=>setOtherSubject(e.target.value)}
className="px-3 py-2 rounded text-black"
/>
)}

<input
placeholder="Semester CGPA"
value={cgpa}
onChange={(e)=>setCgpa(e.target.value)}
className="px-3 py-2 rounded text-black"
/>

<input
type="file"
accept="image/*"
onChange={uploadIdCard}
/>

</div>

{subject &&(
<div className="mb-6 bg-white/10 p-4 rounded-xl">
<h3 className="font-semibold">
📚 Selected Subject: {subject==="Other"?otherSubject:subject}
</h3>
</div>
)}

<button
onClick={submitForm}
className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
>
Save Student Data
</button>

<div className="mt-8 bg-white/10 p-6 rounded-xl">

<h3 className="text-xl mb-4">📚 Monthly Unit Test Marks</h3>

<p className="text-sm mb-4">
Each Unit Test Total Marks = 120
</p>

<div className="grid md:grid-cols-4 gap-4">

{Object.keys(unitTests).map((month)=>(

<div key={month} className="flex flex-col gap-1">

<label>{month}</label>

<input
type="number"
max="120"
placeholder="Obtained Marks"
value={unitTests[month]}
onChange={(e)=>updateTest(month,e.target.value)}
className="text-black px-2 py-1 rounded"
/>

</div>

))}

</div>

</div>

<div className="mt-6 bg-white/10 p-4 rounded-xl">

<h3 className="font-semibold text-lg">📈 Marks Calculation</h3>

<p>Total Obtained Marks: {totalObtained}</p>
<p>Total Maximum Marks: {totalMax}</p>
<p>Percentage: {percentage}%</p>

</div>

<div className="grid md:grid-cols-2 gap-8 mt-8">

<div className="bg-white/10 p-4 rounded-xl">
<h3>Subject Scores</h3>
<Bar data={barData}/>
</div>

<div className="bg-white/10 p-4 rounded-xl">
<h3>Unit Test Performance</h3>
<Line data={lineData}/>
</div>

</div>

<div className="mt-6 bg-white/10 p-4 rounded-xl">

<h3 className="font-semibold mb-2">📄 Upload Marksheet</h3>

<input
type="file"
accept="image/*,application/pdf"
onChange={uploadMarksheet}
/>

{marksheet &&(
<p className="mt-2 text-sm">
Uploaded: {marksheet.name}
</p>
)}

</div>

<div className="mt-6 bg-white/10 p-4 rounded-xl">

<h3 className="font-semibold">🧠 AI Suggestion</h3>

<p>{getSuggestion()}</p>

</div>

</div>

</div>

  );
}

export default PerformanceTracker;