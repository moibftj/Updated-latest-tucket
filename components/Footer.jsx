import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';

const Footer = () => {
  const { toast } = useToast();
  const [newsletter, setNewsletter] = useState({ name: '', email: '' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Welcome to Tucker Trips newsletter.",
    });
    setNewsletter({ name: '', email: '' });
  };

  return (
    <footer className="bg-[#2a3a5a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <div className="relative h-12 sm:h-16 w-auto bg-[#2a3a5a] rounded-lg px-1 sm:px-2" style={{ backgroundColor: '#2a3a5a' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-auto object-contain max-w-[120px] sm:max-w-none"
                  style={{ maxHeight: '48px', mixBlendMode: 'lighten', opacity: 0.95 }}
                >
                  <source src="https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/d3iha7rk_withoutline.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Real travel notes from people you trust. No anonymous reviews—just authentic trip logs from your trusted circle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#ec4899] transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#ec4899] transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#ec4899] transition-colors duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#ec4899] transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Name"
                value={newsletter.name}
                onChange={(e) => setNewsletter({ ...newsletter, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={newsletter.email}
                onChange={(e) => setNewsletter({ ...newsletter, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                className="w-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold"
              >
                Sign up
              </Button>
              <p className="text-xs text-gray-400">
                We never sell your data. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © Tucker Trips
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ec4899] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ec4899] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ec4899] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#ec4899] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;