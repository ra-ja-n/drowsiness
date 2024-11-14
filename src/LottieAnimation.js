import React from "react";
import Lottie from "react-lottie";
import smileyAnimation from "../public/assets/smiley-animation.json";

const LottieAnimation = ({ isSpeaking }) => {
  const defaultOptions = {
    loop: isSpeaking,
    autoplay: isSpeaking,
    animationData: smileyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={`animation-container ${
        isSpeaking ? "wave-animation" : "bounce-animation"
      }`}
    >
      <Lottie options={defaultOptions} height={230} width={280} />
    </div>
  );
};

export default LottieAnimation;
