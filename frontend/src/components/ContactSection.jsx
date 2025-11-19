import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll reply within 1–2 business days.",
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a4d6f] mb-4 md:mb-6">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
                Questions or partnerships? Let's talk.
              </p>
              <Button className="bg-[#ec4899] hover:bg-[#db2777] text-white font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#3a4d6f] mb-4 sm:mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 text-sm sm:text-base">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 text-sm sm:text-base">Phone <span className="text-gray-400 text-xs sm:text-sm">(optional)</span></Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-gray-700 text-sm sm:text-base">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 text-sm sm:text-base">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 min-h-32"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </Button>
              
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                We'll reply within 1–2 business days.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;