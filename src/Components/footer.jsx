import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-900 rounded-full mix-blend-screen opacity-10 animate-blob"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-pink-900 rounded-full mix-blend-screen opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About Us + Social */}
          <motion.div variants={itemVariants} className="footer-column">
            <h4 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-indigo-500">
              About healthdiets
            </h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              Step into comfort with <span className="font-semibold text-pink-400">healthdiets</span>, your go-to destination for health and high-quality diets.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="social-icon hover:text-pink-400 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="social-icon hover:text-blue-400 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="social-icon hover:text-indigo-400 transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="social-icon hover:text-red-500 transition-colors">
                <FaYoutube className="text-xl" />
              </a>
            </div>

            {/* Newsletter Subscription moved here */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold mb-3">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="ngumbaobenedict@gmail.com" 
                  className="px-4 py-2 w-full rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-gradient-to-r from-pink-500 to-indigo-500 px-4 py-2 rounded-r-md font-medium hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links + Business Hours */}
          <motion.div variants={itemVariants} className="footer-column">
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-indigo-500">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/about", text: "About Us" },
                  { to: "/contact", text: "Contact" },
                  { to: "/terms", text: "Terms of Service" },
                  { to: "/privacy", text: "Privacy Policy" },
                  { to: "/returns", text: "Returns Policy" },
                  { to: "/faq", text: "FAQ" }
                  
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-300 hover:text-pink-400 transition-colors relative before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-pink-400 hover:before:w-full before:transition-all before:duration-300"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-indigo-500">
                Business Hours
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-pink-400 mr-3">🕒</span>
                  <span className="text-gray-300">Monday – Friday: 9:00 AM – 7:00 PM</span>
                </li>
                <li className="flex items-center">
                  <span className="text-pink-400 mr-3">🕒</span>
                  <span className="text-gray-300">Saturday: 10:00 AM – 5:00 PM</span>
                </li>
                <li className="flex items-center">
                  <span className="text-pink-400 mr-3">🕒</span>
                  <span className="text-gray-300">Sunday: Closed</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Column 3: Contact Information */}
          <motion.div variants={itemVariants} className="footer-column">
            <h4 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-gradient-to-r after:from-pink-500 after:to-indigo-500">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-pink-400 mr-3 mt-1">📍</span>
                <span className="text-gray-300">123 Fashion Street, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <span className="text-pink-400 mr-3">📞</span>
                <a href="tel:+254700123456" className="text-gray-300 hover:text-white transition-colors">
                  +254 700 123 456
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-pink-400 mr-3">✉️</span>
                <a href="mailto:support@urbansoles.com" className="text-gray-300 hover:text-white transition-colors">
                  support@urbansoles.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-pink-400 mr-3">🌐</span>
                <a href="https://www.urbansoles.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  www.urbansoles.com
                </a>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold mb-3">Payment Methods</h5>
              <div className="flex flex-wrap gap-3">
                <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">Visa</div>
                <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">Mastercard</div>
                <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">M-Pesa</div>
                <div className="bg-gray-800 px-3 py-1 rounded-md text-sm">PayPal</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} Urban Soles. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
    // this is an edit
  );
};

export default Footer;
