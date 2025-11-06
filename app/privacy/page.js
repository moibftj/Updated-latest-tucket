import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Privacy Policy - Tucker Trips',
  description: 'Learn how Tucker Trips protects your privacy and handles your personal travel information. Your data stays within your trusted circle.',
}

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: November 6, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Tucker Trips. We believe in transparent, trustworthy travel planning within your personal circle. 
              This Privacy Policy explains how we collect, use, and protect your information when you use our travel planning 
              and sharing platform.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Tucker Trips is designed to help you share travel experiences with friends and family whose opinions you trust—
              not internet strangers. We take your privacy seriously and are committed to protecting your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Email address (for account creation and notifications)</li>
              <li>Name and profile information</li>
              <li>Biography and profile preferences</li>
              <li>Password (stored securely using industry-standard encryption)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Travel Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Trip details including destinations, dates, and itineraries</li>
              <li>Travel segments (flights, hotels, activities, transportation)</li>
              <li>Photos and memories you choose to upload</li>
              <li>Trip notes, ratings, and reviews</li>
              <li>Chat messages within your travel circles</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Device information and browser type</li>
              <li>IP address and location data (when permitted)</li>
              <li>Usage patterns and feature preferences</li>
              <li>Login times and activity logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Trip Planning:</strong> To help you organize and manage your travel plans</li>
              <li><strong>Sharing:</strong> To enable sharing trip details with your chosen circle of friends and family</li>
              <li><strong>Communication:</strong> To send you important updates, notifications, and shared trip invitations</li>
              <li><strong>Improvement:</strong> To enhance our platform features and user experience</li>
              <li><strong>Security:</strong> To protect your account and prevent unauthorized access</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">With Your Circle</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We only share your trip information with people you explicitly choose to share with. Your travel data 
              remains within your trusted circle and is never shared with strangers or used for advertising purposes.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Public Trips</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you choose to make a trip &quot;public,&quot; it may be visible to other Tucker Trips users for inspiration. 
              You can control this setting for each trip individually.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">We Do NOT Share With</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Third-party advertisers or marketers</li>
              <li>Social media platforms (unless you explicitly connect them)</li>
              <li>Travel booking sites or aggregators</li>
              <li>Any entity that would use your data for commercial purposes</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Legal Requirements</h3>
            <p className="text-gray-700 leading-relaxed">
              We may disclose your information if required by law, court order, or to protect the rights, 
              property, or safety of Tucker Trips, our users, or others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure authentication using JWT tokens</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Secure hosting infrastructure with Supabase and Netlify</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Update:</strong> Modify your profile and trip information at any time</li>
              <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
              <li><strong>Export:</strong> Download your trip data in a portable format</li>
              <li><strong>Control Sharing:</strong> Choose who can see each of your trips</li>
              <li><strong>Opt-out:</strong> Unsubscribe from non-essential emails</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use minimal cookies and tracking technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for login and security</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics:</strong> Basic usage statistics to improve our service (no personal identification)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not use tracking cookies for advertising or share cookie data with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Tucker Trips is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected such information, 
              we will take steps to delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
            <p className="text-gray-700 leading-relaxed">
              Tucker Trips is hosted in the United States. By using our service, you consent to the transfer 
              and processing of your information in the United States, where privacy laws may differ from 
              your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by email or through a notice on our platform. Your continued use of Tucker Trips after such 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your information, 
              please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="text-gray-700"><strong>Email:</strong> privacy@tuckertrips.com</p>
              <p className="text-gray-700"><strong>Mail:</strong> Tucker Trips Privacy Team<br />
              [Company Address]</p>
              <p className="text-gray-700 mt-4">
                We typically respond to privacy inquiries within 48 hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}