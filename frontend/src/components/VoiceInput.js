import React, { useState } from "react";
import { Mic, MicOff, Settings } from "lucide-react";
import { motion } from "framer-motion";

const categoryOptions = [
  "Food",
  "Transport",
  "Books",
  "Entertainment",
  "Medicine",
  "Others",
];

const VoiceInput = ({ onVoiceResult }) => {
  const [listening, setListening] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Voice Transcript:", transcript);
      const parsed = parseVoiceInput(transcript);
      onVoiceResult(parsed);
      setListening(false);
    };

    recognition.onerror = () => {
      alert("Voice input failed. Try again.");
      setListening(false);
    };
  };

  const parseVoiceInput = (input) => {
    const amountMatch = input.match(/(?:₹|rs\.?|rupees?)\s*(\d+)/i);
    const categoryMatch = categoryOptions.find((cat) =>
      input.toLowerCase().includes(cat.toLowerCase())
    );

    const spokenToNumber = {
      one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
      eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
      seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, twentyone: 21, twentytwo: 22,
      twentythree: 23, twentyfour: 24, twentyfive: 25, twentysix: 26, twentyseven: 27,
      twentyeight: 28, twentynine: 29, thirty: 30, thirtyone: 31,
    };

    const months = {
      january: "01", february: "02", march: "03", april: "04",
      may: "05", june: "06", july: "07", august: "08",
      september: "09", october: "10", november: "11", december: "12",
    };

    const words = input.toLowerCase().split(/\s+/);
    let day = "";
    let month = "";
    let year = new Date().getFullYear();

    words.forEach((word) => {
      const cleaned = word.replace(/[^a-z0-9-]/gi, "");

      if (!day && spokenToNumber[cleaned]) {
        day = spokenToNumber[cleaned];
      } else if (!day && !isNaN(parseInt(cleaned))) {
        day = parseInt(cleaned);
      }

      if (!month && months[cleaned]) {
        month = months[cleaned];
      }

      if (!isNaN(cleaned) && cleaned.length === 4 && parseInt(cleaned) > 2020) {
        year = cleaned;
      }
    });

    let date = "";
    if (day && month) {
      date = `${year}-${month}-${day.toString().padStart(2, "0")}`;
    }

    return {
      amount: amountMatch ? amountMatch[1] : "",
      category: categoryMatch || "",
      date: date || "",
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Settings className="w-5 h-5 text-slate-500" />
        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
          {listening ? "Listening..." : "Click to speak your expense (e.g., 'Spent 500 rupees on food today')"}
        </p>
      </div>

      <motion.button
        onClick={handleVoiceInput}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md ${
          listening
            ? "bg-red-500 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        {listening ? "Stop Listening" : "Start Voice Input"}
      </motion.button>
    </motion.div>
  );
};

export default VoiceInput;