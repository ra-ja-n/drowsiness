import React, { useState, useEffect } from "react";
import AssistantUI from "./AssistantUI"; // Import Assistant UI component

function App() {
  const [isVoiceActive, setIsVoiceActive] = useState(true); // Voice state
  const [selectedVoice, setSelectedVoice] = useState(null); // Selected voice
  const [voices, setVoices] = useState([]); // Available voices

  useEffect(() => {
    // Fetch available voices on mount
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]); // Default to first available voice
    };

    if (window.speechSynthesis) {
      fetchVoices();
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }

    return () => window.speechSynthesis.cancel(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (isVoiceActive && selectedVoice)
      startSpeakingLoop(); // Start speaking when voice is active
    else window.speechSynthesis.cancel(); // Stop when inactive
  }, [isVoiceActive, selectedVoice]);

  // Function to start the voice loop
  const startSpeakingLoop = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Please wake up and stay alert."
    );
    utterance.voice = selectedVoice;
    utterance.onend = () => isVoiceActive && startSpeakingLoop(); // Continue loop if active
    window.speechSynthesis.speak(utterance);
  };

  // Toggle voice state (active/inactive)
  const toggleVoice = () => setIsVoiceActive(!isVoiceActive);

  // Handle voice change
  const handleVoiceChange = (e) => {
    const newVoice = voices.find((voice) => voice.name === e.target.value);
    setSelectedVoice(newVoice);
  };

  return (
    <div className="App">
      <div className="animated-ball"></div>
      <h1 className="gradient-text">BeetleGuard.AI</h1>
      <AssistantUI isSpeaking={isVoiceActive} />

      {/* Voice Controls */}
      <div className="voice-controls">
        <label>Voice</label>
        <select value={selectedVoice?.name || ""} onChange={handleVoiceChange}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Start/Stop Button */}
      <button onClick={toggleVoice}>
        {isVoiceActive ? "Stop Voice Alert" : "Start Voice Alert"}
      </button>
    </div>
  );
}

export default App;
