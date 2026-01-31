import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const socialLinks = [
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1898-887711";
  const email = process.env.NEXT_PUBLIC_EMAIL || "support@nexthand.com.bd";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ||
    "143/2, South Kazipara, Mirpur-12, Dhaka-1216";
  const availability =
    process.env.NEXT_PUBLIC_AVAILABILITY || "Sun - Thurs: 9:00 AM - 6:00 PM";

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Nexthand Logo"
                width={140}
                height={50}
                className="object-contain "
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for IT solutions in Bangladesh. We provide
              CCTV installation, IT support, software development, networking
              solutions, and quality tech products at competitive prices.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-primatext-primary group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-white">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-primatext-primary group-hover:w-3 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-400">{address}</span>
              </div>
              <Link
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-primary transition-colors">
                  {phone}
                </span>
              </Link>
              <Link
                href={`mailto:${email.trim()}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-primary transition-colors">
                  {email}
                </span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-400">{availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} Nexthand. All rights reserved.
            </p>

            {/* Developer Credits */}
            <p className="text-sm text-gray-500">
              Developed by{" "}
              <Link
                href="https://webnpixel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:text-teal-300 transition-colors"
              >
                WebNPixel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
