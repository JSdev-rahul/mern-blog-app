import React from "react";
import Lottie from "react-lottie";

export const LottieAnimation = ({ file }) => {
  const defaultOptions = {
    loop: true,
    title: "Coming Soon",
    autoplay: true,
    height: 100,
    animationData: file,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100vw",
        height: "50vh",
       
       
      }}
    >
      <div className="w-96 h-60">
        <Lottie options={defaultOptions} />
        <h1 className="text-2xl text-center text-red-600 " >Loading...</h1>
      </div>
    </div>
  );
};
