import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import RunningImages from '../ui/RunningImages';
import { useEffect, useState, useRef } from 'react';

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

function getVisibleIndices(center, total, visible = 5) {
  const half = Math.floor(visible / 2);
  return Array.from({ length: visible }, (_, i) => (center - half + i + total) % total);
}

function PortfolioCard({ image, title }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden flex-shrink-0 flex items-end justify-center transition-all duration-300 w-full h-full`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover w-full h-full"
        style={{ borderRadius: '16px' }}
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/60 py-2 px-4 text-white text-center text-base font-bold rounded-b-2xl">
        {title}
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      nextSlide();
    } else if (info.offset.x > 50) {
      prevSlide();
    }
  };
  
  const handleCardClick = (clickedIdx) => {
    const centerIdx = Math.floor(config.visibleCount / 2);
    const shift = clickedIdx - centerIdx;
    setIndex((prev) => (prev + shift + items.length) % items.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const config = (() => {
    switch (screenSize) {
      case 'mobile':
        return {
          visibleCount: 3,
          scales: [0.8, 1.0, 0.8],
          zIndexes: [5, 20, 5],
          spacing: 180,
          containerHeight: 280,
          opacities: [0.6, 1, 0.6]
        };
      case 'tablet':
        return {
          visibleCount: 5,
          scales: [0.8, 0.9, 1.1, 0.9, 0.8],
          zIndexes: [5, 10, 20, 10, 5],
          spacing: 200,
          containerHeight: 320,
          opacities: [0.4, 0.8, 1, 0.8, 0.4]
        };
      default: // desktop
        return {
          visibleCount: 5,
          scales: [0.85, 0.95, 1.1, 0.95, 0.85],
          zIndexes: [5, 10, 30, 10, 5],
          spacing: 260,
          containerHeight: 350,
          opacities: [0.5, 0.9, 1, 0.9, 0.5]
        };
    }
  })();

  return (
    <div id="Portfolio" className={`h-full w-full flex flex-col justify-center items-center bg-[#0F103F] ${poppins.className} relative overflow-hidden py-12`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-8 sm:mb-12"
      >
        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">PORTFOLIO</h2>
        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
      </motion.div>

      <div 
        className="relative flex items-center justify-center w-full" 
        style={{ height: config.containerHeight }}
      >
        <AnimatePresence initial={false}>
          {items.length > 0 && getVisibleIndices(index, items.length, config.visibleCount).map((itemIndex, cardPosition) => {
            const isCenterCard = cardPosition === Math.floor(config.visibleCount / 2);
            return (
              <motion.div
                key={itemIndex}
                layoutId={`card-${itemIndex}`}
                className="absolute"
                style={{
                  width: 240,
                  height: 330,
                  transformOrigin: 'center',
                }}
                initial={{
                  x: (cardPosition - Math.floor(config.visibleCount / 2)) * config.spacing,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: (cardPosition - Math.floor(config.visibleCount / 2)) * config.spacing,
                  zIndex: config.zIndexes[cardPosition],
                  scale: config.scales[cardPosition],
                  opacity: config.opacities[cardPosition],
                }}
                exit={{
                  x: (cardPosition < Math.floor(config.visibleCount / 2) ? -1 : 1) * config.spacing * 2,
                  scale: 0.5,
                  opacity: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                }}
                drag={isCenterCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => handleCardClick(cardPosition)}
              >
                <PortfolioCard 
                  image={items[itemIndex].imageUrl} 
                  title={items[itemIndex].title} 
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

     
      
      <div className="mt-8 w-full">
        <RunningImages />
      </div>
    </div>
  );
} 