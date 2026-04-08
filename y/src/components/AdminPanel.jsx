import React, { useEffect, useState } from "react";

function AdminPanel() {

const ADMIN_EMAIL="subhamshaktisingh@gmail.com";
const ADMIN_PASS="subham@123";

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [isAdmin,setIsAdmin]=useState(false);

const [users,setUsers]=useState([]);
const [teachers,setTeachers]=useState([]);
const [studyPlans,setStudyPlans]=useState([]);
const [emergency,setEmergency]=useState([]);

const [activeTab,setActiveTab]=useState("users");

const [editIndex,setEditIndex]=useState(null);
const [editType,setEditType]=useState("");
const [editData,setEditData]=useState({});

const [toast,setToast]=useState("");


// LOAD DATA
useEffect(()=>{

if(!isAdmin) return;

setUsers(JSON.parse(localStorage.getItem("loginHistory")) || []);
setTeachers(JSON.parse(localStorage.getItem("teacherFeedback")) || []);
setStudyPlans(JSON.parse(localStorage.getItem("studyTasks")) || []);
setEmergency(JSON.parse(localStorage.getItem("emergencyAlerts")) || []);

},[isAdmin]);


// EMERGENCY ALERT
useEffect(()=>{

const interval=setInterval(()=>{

const alerts=JSON.parse(localStorage.getItem("emergencyAlerts")) || [];

if(alerts.length>emergency.length){
alert("🚨 New Emergency Alert!");
setEmergency(alerts);
}

},3000);

return()=>clearInterval(interval);

},[emergency]);


// LOGIN
const handleLogin=()=>{
if(email===ADMIN_EMAIL && password===ADMIN_PASS){
setIsAdmin(true);
}else{
alert("❌ Invalid Admin Credentials");
}
};


// DELETE FUNCTIONS
const deleteUser=(i)=>{
const updated=users.filter((_,index)=>index!==i);
setUsers(updated);
localStorage.setItem("loginHistory",JSON.stringify(updated));
};

const deleteTeacher=(i)=>{
const updated=teachers.filter((_,index)=>index!==i);
setTeachers(updated);
localStorage.setItem("teacherFeedback",JSON.stringify(updated));
};

const deleteStudy=(i)=>{
const updated=studyPlans.filter((_,index)=>index!==i);
setStudyPlans(updated);
localStorage.setItem("studyTasks",JSON.stringify(updated));
};

const deleteEmergency=(i)=>{
const updated=emergency.filter((_,index)=>index!==i);
setEmergency(updated);
localStorage.setItem("emergencyAlerts",JSON.stringify(updated));
};


// LOGIN PAGE
if(!isAdmin){

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">

<div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-80 text-white">

<h2 className="text-3xl font-bold text-center mb-6">
🔐 Admin Login
</h2>

<input
type="email"
placeholder="Admin Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 border border-white/20 bg-white/20 rounded mb-4"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 border border-white/20 bg-white/20 rounded mb-4"
/>

<button
onClick={handleLogin}
className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded">
🚀 Login
</button>

</div>
</div>

);
}


// DASHBOARD
return(

<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">

{toast && (
<div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-2 rounded shadow">
{toast}
</div>
)}

{/* NAVBAR */}

<div className="flex justify-between p-4 bg-white/10 backdrop-blur-lg border-b border-white/20">

<h1 className="text-3xl font-bold">
🤖 Smart Admin Dashboard
</h1>

<div className="flex gap-3">

<button onClick={()=>setActiveTab("users")} className="bg-white/20 px-3 py-1 rounded">Users</button>

<button onClick={()=>setActiveTab("teachers")} className="bg-white/20 px-3 py-1 rounded">Feedback</button>

<button onClick={()=>setActiveTab("study")} className="bg-white/20 px-3 py-1 rounded">Study</button>

<button onClick={()=>setActiveTab("emergency")} className="bg-red-600 px-3 py-1 rounded">Emergency</button>

<button onClick={()=>setIsAdmin(false)} className="bg-red-800 px-3 py-1 rounded">Logout</button>

</div>
</div>


{/* COUNTERS */}

<div className="grid md:grid-cols-4 gap-6 p-8">

<div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-center hover:scale-105 transition">
<h2>Users</h2>
<p className="text-3xl font-bold">{users.length}</p>
</div>

<div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-center hover:scale-105 transition">
<h2>Feedback</h2>
<p className="text-3xl font-bold">{teachers.length}</p>
</div>

<div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-center hover:scale-105 transition">
<h2>Study</h2>
<p className="text-3xl font-bold">{studyPlans.length}</p>
</div>

<div className="bg-red-500/30 backdrop-blur-lg border border-red-400 p-6 rounded-xl text-center hover:scale-105 transition">
<h2>Emergency</h2>
<p className="text-3xl font-bold">{emergency.length}</p>
</div>

</div>



{/* USERS */}

{activeTab==="users" && (

<div className="p-8 grid md:grid-cols-2 gap-4">

{users.map((u,i)=>(

<div key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl hover:scale-105 transition">

<p><b>Name:</b> {u.name}</p>
<p><b>Email:</b> {u.email}</p>
<p><b>Date:</b> {u.date}</p>

<button
onClick={()=>deleteUser(i)}
className="mt-3 bg-red-500 px-3 py-1 rounded">
Delete
</button>

</div>

))}

</div>

)}



{/* TEACHERS */}

{activeTab==="teachers" && (

<div className="p-8 grid md:grid-cols-2 gap-4">

{teachers.map((t,i)=>(

<div key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl">

<p><b>Teacher:</b> {t.teacher}</p>
<p><b>Subject:</b> {t.subject}</p>
<p><b>Feedback:</b> {t.text}</p>
<p><b>Rating:</b> {"⭐".repeat(t.rating)}</p>
<p><b>Date:</b> {t.date}</p>

<button
onClick={()=>deleteTeacher(i)}
className="mt-3 bg-red-500 px-3 py-1 rounded">
Delete
</button>

</div>

))}

</div>

)}



{/* STUDY */}

{activeTab==="study" && (

<div className="p-8 grid md:grid-cols-2 gap-4">

{studyPlans.map((s,i)=>(

<div key={i} className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl">

<p><b>Student:</b> {s.student}</p>
<p><b>Subject:</b> {s.subject}</p>
<p><b>Teacher:</b> {s.teacher}</p>
<p><b>Performance:</b> {s.performance}</p>
<p><b>Time:</b> {s.time}</p>

<button
onClick={()=>deleteStudy(i)}
className="mt-3 bg-red-500 px-3 py-1 rounded">
Delete
</button>

</div>

))}

</div>

)}



{/* EMERGENCY */}

{activeTab==="emergency" && (

<div className="p-8 grid md:grid-cols-2 gap-4">

{emergency.map((e,i)=>(

<div key={i} className="bg-red-500/20 backdrop-blur-lg border border-red-400 p-5 rounded-xl">

<p>🚨 <b>Student:</b> {e.student}</p>
<p>⚠️ <b>Message:</b> {e.message}</p>
<p>📅 <b>Date:</b> {e.date}</p>

<button
onClick={()=>deleteEmergency(i)}
className="mt-3 bg-red-600 px-3 py-1 rounded">
Delete
</button>

</div>

))}

</div>

)}

</div>

);
}

export default AdminPanel;