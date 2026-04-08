import React, { useState } from "react";

function EmergencySupport() {

  const [location, setLocation] = useState(null);
  const [alertSent, setAlertSent] = useState(false);
  const [aiReply, setAiReply] = useState("");

  const studentName = "Subham shakti singh";
  const parentPhone = "8249194885";

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setLocation(loc);
      });
    }
  };

  const sendAlert = () => {

    const alertData = {
      student: studentName,
      time: new Date().toLocaleString(),
      location: location
    };

    const oldAlerts = JSON.parse(localStorage.getItem("emergencyAlerts")) || [];
    oldAlerts.push(alertData);
    localStorage.setItem("emergencyAlerts", JSON.stringify(oldAlerts));

    setAlertSent(true);

    alert("🚨 Emergency Alert Sent to Admin & Parents!");
  };

  const sendSMS = () => {

    const message =
      "Emergency Alert! Your child may need help. Please check immediately.";

    const smsLink = `sms:${parentPhone}?body=${encodeURIComponent(message)}`;

    window.location.href = smsLink;
  };

  const handleAIHelp = () => {
    setAiReply(
      "Take a deep breath. Try relaxing for a few minutes. You are not alone and help is available. 💙"
    );
  };

  return (

<div
className="relative flex items-center justify-center min-h-screen p-6 bg-cover bg-center"
style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1584448141569-69f342da535c')"
}}
>

{/* Dark overlay */}
<div className="absolute inset-0 bg-black/70"></div>

{/* Emergency glowing effect */}
<div className="absolute w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
<div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

<div className="relative bg-white/20 backdrop-blur-xl border border-white/30
shadow-2xl rounded-3xl p-8 w-full max-w-lg text-white">

<h2 className="text-3xl font-bold text-center mb-6 animate-pulse">
🚨 Emergency Support
</h2>

<div className="bg-white/10 p-3 rounded-lg mb-4 text-sm">
Student: {studentName}
</div>

<button
onClick={sendAlert}
className="w-full bg-red-600 py-3 rounded-xl font-semibold
hover:bg-red-700 transition transform hover:scale-105 mb-4"
>
🚨 Send Emergency Alert
</button>

{alertSent && (
<p className="text-center text-yellow-200 mb-4">
Alert sent to Admin Dashboard & Parents 📱
</p>
)}

<button
onClick={getLocation}
className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 mb-3"
>
📍 Get Live Location
</button>

{location && (
<div className="text-sm bg-white/10 p-3 rounded-lg mb-4">
Latitude: {location.lat}
<br/>
Longitude: {location.lng}
</div>
)}

{location && (
<iframe
title="map"
width="100%"
height="200"
className="rounded-lg mb-4"
src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
></iframe>
)}

<button
onClick={sendSMS}
className="w-full bg-green-500 py-2 rounded-lg hover:bg-green-600 mb-4"
>
📱 Send SMS to Parents
</button>

<button
onClick={handleAIHelp}
className="w-full bg-purple-500 py-2 rounded-lg hover:bg-purple-600"
>
🤖 AI Mental Health Support
</button>

{aiReply && (
<div className="mt-4 bg-white/10 p-3 rounded-lg text-sm">
{aiReply}
</div>
)}

</div>

</div>

  );
}

export default EmergencySupport;