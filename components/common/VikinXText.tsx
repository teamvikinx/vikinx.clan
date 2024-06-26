import React from "react";
import localFonts from "next/font/local";

const NHLDucks = localFonts({ src: "../../app/fonts/NHL Ducks.ttf" });

interface VikinXTextProps {
    className?: string
}

const VikinXText: React.FC<VikinXTextProps> = ({className}) => {
  return (
    <>
      <span className={`inline-flex items-center ${className}`}>
        VIKIN
        <span className={`text-primary font-bold`}>X</span>
      </span>
    </>
  );
};

export default VikinXText;
