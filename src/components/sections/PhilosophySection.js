import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

const philosophyCards = [
  {
    icon: "/target.svg",
    title: "On Point",
    description: "We help you to research and making your memorable memories",
  },
  {
    icon: "/eye.svg",
    title: "Stunning Visual",
    description: "With a experienced team and professional equipment, you can get much more quality content",
  },
  {
    icon: "/star.svg",
    title: "Values",
    description: "Get more values from us without worries",
  },
];

function PhilosophyCard({ icon, title, description }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-xl flex flex-col items-center p-6 sm:p-8 w-full md:w-[230px] md:h-[350px] transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <img src={icon} alt={title} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
        <h3 className="text-white text-lg sm:text-xl font-bold mb-3 text-center">{title}</h3>
        <p className="text-white/90 text-sm sm:text-base text-center font-light leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  return (
    <div id="Philosophy" className={`h-full w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#9C90D0] via-[#0F103F] via-70% to-[#0F103F] ${poppins.className} relative overflow-hidden z-0`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-8 sm:mb-12"
      >
        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">PHILOSOPHY</h2>
        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 w-full justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        {philosophyCards.map((card, index) => (
          <PhilosophyCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
} 