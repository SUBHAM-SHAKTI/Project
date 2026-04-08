import React, { useState } from "react";

function SentimentAnalysis() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [history, setHistory] = useState([]);

  const analyzeSentiment = () => {

    const lowerText = text.toLowerCase();

    let sentiment = "Neutral 😐";
    let tip = "Your mood looks balanced 🙂 Keep going 👍";

    if (
      lowerText.includes("happy") ||
      lowerText.includes("good") ||
      lowerText.includes("great") ||
      lowerText.includes("awesome")
    ) {
      sentiment = "Positive 😊✨";
      tip = "Great! Keep doing what makes you happy 🚀🌈";
    }

    else if (
      lowerText.includes("sad") ||
      lowerText.includes("stress") ||
      lowerText.includes("tired") ||
      lowerText.includes("angry")
    ) {
      sentiment = "Negative 😔💭";
      tip = "Take a short break 🧘‍♂️ listen to music 🎵 and relax 🌿";
    }

    setResult(sentiment);
    setAdvice(tip);

    setHistory([
      { text, sentiment },
      ...history
    ]);

    setText("");
  };

  const getProgress = () => {
    if (result.includes("Positive")) return 100;
    if (result.includes("Neutral")) return 60;
    if (result.includes("Negative")) return 30;
    return 0;
  };

  return (

    <div
      className="relative min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')"
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated blobs */}
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>

      <div className="relative bg-white/20 backdrop-blur-xl border border-white/30
      shadow-2xl rounded-3xl p-8 w-full max-w-xl text-white
      transition hover:scale-105 duration-500">

        <h2 className="text-3xl font-bold text-center mb-2">
          😊 Emotion Detection AI
        </h2>

        <p className="text-center opacity-80 mb-6">
          Tell us how you feel today 💬
        </p>

        <textarea
          placeholder="🧠 Tell us how you feel..."
          value={text}
          className="w-full p-3 rounded-lg text-black h-32
          focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyzeSentiment}
          className="w-full bg-purple-600 py-2 rounded-lg
          hover:bg-purple-700 transition transform hover:scale-105 shadow-lg"
        >
          🔍 Analyze Emotion
        </button>

        {result && (

          <div className="mt-6 text-center">

            <h3 className="text-lg font-semibold">
              📊 Sentiment Result
            </h3>

            <p className="text-3xl mt-2 font-bold animate-bounce">
              {result}
            </p>

            <p className="mt-2 text-sm opacity-90">
              {advice}
            </p>

            {/* Emotion Meter */}
            <div className="mt-4 w-full bg-white/20 rounded-full h-4">

              <div
                className="bg-green-400 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
              ></div>

            </div>

          </div>

        )}

        {history.length > 0 && (

          <div className="mt-6 bg-white/10 p-4 rounded-xl">

            <h3 className="font-semibold mb-2">
              📜 Emotion History
            </h3>

            <div className="max-h-32 overflow-y-auto text-sm space-y-2">

              {history.slice(0,5).map((item, index) => (

                <div
                  key={index}
                  className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"
                >

                  <p>
                    💬 {item.text}
                  </p>

                  <p className="text-green-300">
                    {item.sentiment}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default SentimentAnalysis;