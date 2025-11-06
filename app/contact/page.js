'use client'

import { ArrowLeft, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tucker Trips
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            We're here to help you make the most of your Tucker Trips experience. 
            Reach out with questions, feedback, or just to say hello!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-l-4 border-l-[#ff34ac]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Mail className="w-5 h-5 text-[#ff34ac]" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                For general questions, technical support, or feedback about Tucker Trips.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">General:</span>
                  <a href="mailto:hello@tuckertrips.com" className="text-[#ff34ac] hover:underline">
                    hello@tuckertrips.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Support:</span>
                  <a href="mailto:support@tuckertrips.com" className="text-[#ff34ac] hover:underline">
                    support@tuckertrips.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Response time: 24-48 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#7dbbe5]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <MessageCircle className="w-5 h-5 text-[#7dbbe5]" />
                Community & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Share ideas, request features, or connect with other travelers in your circle.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Feedback:</span>
                  <a href="mailto:feedback@tuckertrips.com" className="text-[#7dbbe5] hover:underline">
                    feedback@tuckertrips.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Ideas:</span>
                  <a href="mailto:ideas@tuckertrips.com" className="text-[#7dbbe5] hover:underline">
                    ideas@tuckertrips.com
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  We love hearing from our community and actively implement user suggestions!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Contact Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff34ac] focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff34ac] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff34ac] focus:border-transparent"
              >
                <option value="">Select a topic</option>
                <option value="general">General Question</option>
                <option value="technical">Technical Support</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="account">Account Issue</option>
                <option value="privacy">Privacy & Security</option>
                <option value="business">Business Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff34ac] focus:border-transparent"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <Button 
              type="submit" 
              className="bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white px-8 py-2 rounded-md hover:shadow-lg transition-all duration-200"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How is Tucker Trips different from other travel apps?
              </h3>
              <p className="text-gray-700">
                Tucker Trips focuses on sharing travel experiences within your trusted circle of friends and family, 
                rather than relying on reviews from strangers. We help you organize trips and get advice from 
                people whose opinions you actually value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is Tucker Trips free to use?
              </h3>
              <p className="text-gray-700">
                Yes! Tucker Trips is currently free to use. We believe in helping people create better travel 
                experiences by connecting with their personal networks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How do I share a trip with my friends?
              </h3>
              <p className="text-gray-700">
                When creating or editing a trip, you can set its visibility to "Shared" and enter email addresses 
                of people you want to share with. They'll receive an invitation to view your trip details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I export my trip data?
              </h3>
              <p className="text-gray-700">
                Yes! You can export your trip data from your profile settings. We believe your travel memories 
                belong to you and should be portable.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What happens if I delete my account?
              </h3>
              <p className="text-gray-700">
                When you delete your account, your personal information is removed according to our Privacy Policy. 
                Trips you've shared may remain visible to maintain the integrity of shared experiences, but your 
                name will be anonymized.
              </p>
            </div>
          </div>
        </div>

        {/* Business Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business & Partnership Inquiries</h2>
          <p className="text-gray-700 mb-6">
            Interested in partnering with Tucker Trips or have a business opportunity? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Partnership Opportunities</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Travel industry integrations</li>
                <li>Content partnerships</li>
                <li>Technology collaborations</li>
                <li>Marketing partnerships</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href="mailto:business@tuckertrips.com" className="text-[#ff34ac] hover:underline">
                    business@tuckertrips.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">[Company Address]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600">
          <p>
            Thanks for being part of the Tucker Trips community! We're here to help you plan smarter, 
            travel better, and live fully. 🧳✈️
          </p>
        </div>
      </div>
    </div>
  )
}