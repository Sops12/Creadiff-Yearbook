import { FaHome, FaUser, FaBriefcase, FaPhone, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F103F] py-10 px-4">
      <div className="flex flex-col items-center">
        {/* Menu Navigasi */}
        <div className="flex space-x-10 mb-6">
          <a href="#Home" className="flex items-center text-white space-x-2 hover:underline">
            <FaHome />
            <span>Home</span>
          </a>
          <a href="#About-Us" className="flex items-center text-white space-x-2 hover:underline">
            <FaUser />
            <span>About Us</span>
          </a>
          <a href="#Portfolio" className="flex items-center text-white space-x-2 hover:underline">
            <FaBriefcase />
            <span>Portfolio</span>
          </a>
          <a href="#Contact" className="flex items-center text-white space-x-2 hover:underline">
            <FaPhone />
            <span>Contact</span>
          </a>
        </div>
        {/* Sosial Media */}
        <div className="flex space-x-4 mb-6">
          <a href="#" className="text-pink-500 bg-white rounded-full p-2 text-2xl"><FaInstagram /></a>
          <a href="#" className="text-blue-400 bg-white rounded-full p-2 text-2xl"><FaTwitter /></a>
          <a href="#" className="text-blue-600 bg-white rounded-full p-2 text-2xl"><FaLinkedin /></a>
          <a href="#" className="text-blue-800 bg-white rounded-full p-2 text-2xl"><FaFacebook /></a>
          <a href="#" className="text-red-600 bg-white rounded-full p-2 text-2xl"><FaYoutube /></a>
        </div>
        {/* Garis */}
        <hr className="border-t border-white/20 w-full max-w-2xl mb-4" />
        {/* Copyright & Policy */}
        <div className="text-white text-sm text-center">
          Terms of Service - Privacy Policy
        </div>
      </div>
    </footer>
  );
}
