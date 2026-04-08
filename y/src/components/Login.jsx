import React, { useState } from "react";

function Login() {

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // PHONE VALIDATION
  const validatePhone = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  // PASSWORD STRENGTH
  const checkPasswordStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) return "Strong";
    return "Medium";
  };

  const passwordStrength = checkPasswordStrength(password);

  // REGISTER
  const handleRegister = () => {

    if (!name || !phone || !password) {
      setMessage("❗ Name, Mobile Number and Password are mandatory");
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("📱 Mobile number must be 10 digits");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("🔑 Passwords do not match");
      return;
    }

    const user = { name, phone, email, password };

    localStorage.setItem("user", JSON.stringify(user));

    setMessage("✅ Registration Successful! Please Login");

    // Clear form
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setIsRegister(false);
  };

  // LOGIN
  const handleLogin = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setMessage("⚠ Please register first");
      return;
    }

    if (
      (email === storedUser.email || phone === storedUser.phone) &&
      password === storedUser.password
    ) {

      setLoading(true);

      setTimeout(() => {
        alert("🎉 Login Successful");
        window.location.href = "/dashboard";
      }, 1200);

    } else {
      setMessage("❌ Invalid login details");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30
      shadow-2xl rounded-3xl p-8 w-full max-w-md text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          {isRegister ? "📝 Register" : "👋 Welcome Back"}
        </h2>

        {message && (
          <p className="text-center text-yellow-200 mb-3">{message}</p>
        )}

        <div className="space-y-4">

          {/* Name */}
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name *"
              value={name}
              className="w-full px-4 py-2 rounded-lg text-black"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* Phone */}
          {isRegister && (
            <input
              type="number"
              placeholder="Mobile Number *"
              value={phone}
              className="w-full px-4 py-2 rounded-lg text-black"
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            className="w-full px-4 py-2 rounded-lg text-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              value={password}
              className="w-full px-4 py-2 rounded-lg text-black"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer text-black"
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>

          {/* Password Strength */}
          {password && (
            <p className="text-sm">
              Password Strength: 
              <span className="ml-1 font-bold">{passwordStrength}</span>
            </p>
          )}

          {/* Confirm Password */}
          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              className="w-full px-4 py-2 rounded-lg text-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {/* Button */}
          <button
            onClick={isRegister ? handleRegister : handleLogin}
            className="w-full bg-purple-600 py-2 rounded-lg 
            hover:bg-purple-700 transition transform hover:scale-105"
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </button>

        </div>

        {/* Switch */}
        <p className="text-sm text-center mt-6">

          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <span
            onClick={() => setIsRegister(!isRegister)}
            className="cursor-pointer text-yellow-200 hover:underline ml-2"
          >
            {isRegister ? "Login" : "Register"}
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;