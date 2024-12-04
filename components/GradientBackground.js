import React from "react";

export default function GradientBackground({ children }) {
  return (
    <>
      {/* <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to right, 
                    rgba(255, 0, 0, 0.8),  
                    rgba(0, 0, 255, 0.8)   
                )`,
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)", // Optional glow effect
        }}
      > */}
      {children}
      {/* </div> */}
    </>
  );
}
