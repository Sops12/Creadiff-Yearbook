import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import IllustrationBottom from "./IllustrationBottom";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function HomeSection() {
  const typedElMobile = useRef(null);
  const typedElDesktop = useRef(null);
  const typedInstance = useRef(null);
  const [isTypedReady, setIsTypedReady] = useState(false);

  useEffect(() => {
    // console.log('HomeSection mounted'); // Debug
    
    // Tunggu sampai DOM siap
    const timer = setTimeout(() => {
      // Cek elemen mobile terlebih dahulu
      const targetElement = typedElMobile.current || typedElDesktop.current;
      // console.log('Typed.js element mobile:', typedElMobile.current); // Debug
      // console.log('Typed.js element desktop:', typedElDesktop.current); // Debug
      
      if (targetElement) {
        try {
          typedInstance.current = new Typed(targetElement, {
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
          // console.log('Typed.js initialized successfully'); // Debug
          setIsTypedReady(true);
        } catch (error) {
          // console.error('Typed.js error:', error); // Debug
        }
      } else {
        // console.log('Typed.js element not found'); // Debug
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (typedInstance.current) {
        typedInstance.current.destroy();
        typedInstance.current = null;
      }
    };
  }, []);

  return (
    <div id="Home" className={`h-full w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#C961DE] via-[#C961DE] via-50% to-[#3E27A5] ${poppins.className} relative`}>

      
      <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Mobile Layout - Logo di atas, Text di bawah */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full">
          {/* Logo di atas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full flex justify-center items-center mb-8"
          >
            <div className="aspect-square w-[200px] sm:w-[250px] md:w-[300px] rounded-2xl bg-white/10 backdrop-blur-sm shadow-2xl p-3 sm:p-4 relative overflow-hidden">
              {/* Neumorphic effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent rounded-2xl"></div>
              {/* Placeholder for GIF */}
              <div className="relative z-10 w-full h-full flex items-center justify-center text-white/50">
               <img src="/logoPutih.svg" alt="introLogo" className="w-full h-full object-contain" />
              </div>
            </div>
          </motion.div>

          {/* Text di bawah */}
          <div className="w-full flex flex-col justify-center px-2 sm:px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-3 lg:mb-4 max-w-4xl leading-tight"
            >
              CREADIFF<br />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-white text-base sm:text-lg md:text-xl font-medium text-center mb-3 sm:mb-4 lg:mb-6 max-w-4xl leading-relaxed"
            >
              <span ref={typedElMobile}>More than a yearbook<br />we tell your school's story</span>
            </motion.p>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex w-full">
          {/* Left side - Text */}
          <div className="w-1/2 flex flex-col justify-center px-2 sm:px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-6xl xl:text-7xl 2xl:text-8xl font-bold text-left mb-2 sm:mb-3 lg:mb-4 max-w-4xl leading-tight"
            >
              CREADIFF<br />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-white text-2xl xl:text-3xl 2xl:text-4xl font-medium text-left mb-3 sm:mb-4 lg:mb-6 max-w-4xl leading-relaxed"
            >
              <span ref={typedElDesktop}>More than a yearbook<br />we tell your school's story</span>
            </motion.p>
          </div>

          {/* Right side - Glass effect container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-1/2 flex justify-center items-center"
          >
          <div className="aspect-square w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] rounded-2xl bg-white/10 backdrop-blur-sm shadow-2xl p-3 sm:p-4 relative overflow-hidden">
            {/* Neumorphic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent rounded-2xl"></div>
            {/* Placeholder for GIF */}
            <div className="relative z-10 w-full h-full flex items-center justify-center text-white/50">
             <img src="/logoPutih.svg" alt="introLogo" className="w-full h-full object-contain" />
            </div>
          </div>
        </motion.div>
        </div>
      </div>
      
      {/* IllustrationBottom di bawah kanan HomeSection */}
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] pointer-events-none select-none z-10" style={{ transform: 'translateY(50%)' }}>
        <IllustrationBottom style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Decorative elements for mobile */}
      <div className="absolute bottom-4 left-4 lg:hidden pointer-events-none">
        <div className="w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
        <div className="w-8 h-8 bg-white/5 rounded-full blur-sm mt-2 ml-4"></div>
      </div>

    </div>
  );
} 