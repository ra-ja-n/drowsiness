import React from "react";
import LottieAnimation from "./LottieAnimation"; // Import Lottie animation component

const AssistantUI = ({ isSpeaking }) => {
  return (
    <div className="assistant-container">
      <LottieAnimation isSpeaking={isSpeaking} />
    </div>
  );
};

export default AssistantUI;
