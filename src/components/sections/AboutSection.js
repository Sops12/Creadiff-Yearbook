import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import IllustrationTop from "./IllustrationTop";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function AboutSection() {
  return (
    <div id="About-Us" className={`h-full w-full flex flex-col justify-center items-center bg-[url('/backgroundAbout.png')] bg-cover bg-center ${poppins.className} relative`}>
      <div className="flex flex-col justify-center items-center h-full w-full px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex flex-col items-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image 
              src="/logoCreadiff.svg" 
              alt="Logo" 
              width={300} 
              height={250}
              className="w-[100px] sm:w-[150px] md:w-[190px] lg:w-[220px] xl:w-[270px]"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-light leading-relaxed text-center mt-4 sm:mt-6 space-y-2 sm:space-y-3 md:space-y-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              CREADIFF adalah sebuah rumah produksi dibawah naungan PT. BAYU PRIMA WISATA, dan berafiliasi ATHA PHOTO STUDIO. Yang sudah bergerak sejak 2019.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Kami sudah bekerja sama dengan ratusan client seperti instansi pendidikan, pemerintahan, maupun perusahaan baik komersil maupun non komersil.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Sebagai professional, kami selalu memprioritaskan dan berusahan memuaskan client. Menambahkan bumbu dan cita rasa CREADIFF yaitu "Create Different". Seperti layaknya 'cherry on the top'.
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* IllustrationTop di AboutSection */}
      <div className="absolute top-0 left-0 w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] pointer-events-none select-none z-10" style={{ transform: 'translateY(-35%)' }}>
        <IllustrationTop style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
} 