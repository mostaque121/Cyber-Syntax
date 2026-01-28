import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-white">nexthand</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted marketplace for quality pre-owned electronics. Find
              the best deals on smartphones, laptops, gaming consoles, and more.
            </p>
            <div className="flex space-x-4">
              <FiFacebook className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <FiTwitter className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <FiInstagram className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <FiYoutube className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Hot Deal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-400">
                  123 Tech Street, Digital City, DC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-400">
                  support@nexthand.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-sm text-gray-400">Mon-Fri: 9AM-5PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 nexthand. All rights reserved.
            </div>

            {/* Developer Credits */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="text-sm text-gray-400">
                Developed by{" "}
                <span className="text-green-500 font-medium">
                  Team WebNGraphic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
