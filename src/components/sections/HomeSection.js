import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import IllustrationBottom from "./IllustrationBottom";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function HomeSection() {
  const typedEl = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedEl.current, {
      strings: [
        "More than a yearbook<br />we tell your school's story"
      ],
      typeSpeed: 50,
      backSpeed: 25,
      showCursor: true,
      smartBackspace: false,
      loop: true,
      fadeOut: false,
      contentType: 'html',
    });
    return () => {
      typedInstance.current && typedInstance.current.destroy();
    };
  }, []);

  return (
    <div id="Home" className={`h-full w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#C961DE] via-[#C961DE] via-50% to-[#3E27A5] ${poppins.className} relative`}>
      <div className="flex flex-col lg:flex-row justify-between items-center h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Left side - Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mb-6 sm:mb-8 lg:mb-0 px-2 sm:px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center lg:text-left mb-2 sm:mb-3 lg:mb-4 max-w-4xl leading-tight"
          >
            CREADIFF<br />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-center lg:text-left mb-3 sm:mb-4 lg:mb-6 max-w-4xl leading-relaxed"
          >
            <span ref={typedEl} />
          </motion.p>
        </div>

        {/* Right side - Glass effect container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <div className="aspect-square w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] rounded-2xl p-3 sm:p-4">
            {/* Placeholder for GIF */}
            <div className="w-full h-full flex items-center justify-center text-white/50">
             <img src="/logoPutih.svg" alt="introLogo" className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* IllustrationBottom di bawah kanan HomeSection */}
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] pointer-events-none select-none z-10" style={{ transform: 'translateY(50%)' }}>
        <IllustrationBottom style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
} 