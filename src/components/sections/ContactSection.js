"use client";

import { useState } from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["300", "700"],
  subsets: ["latin"],
});

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="Contact" className={`min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#0F103F] to-[#0F103F] p-4 sm:p-6 md:p-8 ${poppins.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-8 sm:mb-12"
      >
        <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">CONTACT</h2>
        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
      </motion.div>
      
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 flex flex-col md:flex-row gap-8">
        {/* Left: Form & Info */}
        <div className="flex-1 flex flex-col gap-8 justify-center">
            <h3 className="text-white text-xl font-bold text-center mb-2">Email</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#9C90D0]" 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#9C90D0]" 
            />
            <textarea 
              name="message"
              placeholder="Message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              required
              className="p-3 rounded bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#9C90D0] resize-none" 
            />
            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 bg-[#9C90D0] hover:bg-[#7a6bb7] text-white font-bold py-3 rounded transition-colors disabled:bg-gray-500"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="text-center text-white mt-4">{status}</p>}
          </form>
        </div>

        {/* Right: Contact Info & Socials */}
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white p-4 border-l-0 md:border-l border-white/20">
          <h3 className="text-xl font-bold mb-6">Contact Information</h3>
          
          <div className="text-white/80 space-y-4 mb-8">
            <div>
              <p className="font-semibold text-white">Email</p>
              <a href="mailto:creadifferen@gmail.com" className="hover:text-[#9C90D0] transition-colors">creadifferen@gmail.com</a>
            </div>
            <div>
              <p className="font-semibold text-white">Phone</p>
              <a href="tel:+62895321920464" className="hover:text-[#9C90D0] transition-colors">+62 895-3219-20464</a>
            </div>
            <div>
              <p className="font-semibold text-white">Address</p>
              <p>Perumahan Royal Permata Blok B2 No. 17<br/>Saga, Balaraja, Tangerang - Banten 15610</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Social Media</h3>
          <div className="flex justify-center gap-6 text-3xl">
            <a href="https://instagram.com/creadiff.yearbook" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C90D0] transition-colors"><FaInstagram /></a>
            <a href="https://wa.me/+62895321920464" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C90D0] transition-colors"><FaWhatsapp /></a>
            <a href="https://tiktok.com/@creadiff_yearbook" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C90D0] transition-colors"><FaTiktok /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
