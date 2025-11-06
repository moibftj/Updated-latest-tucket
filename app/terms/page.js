import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Terms of Service - Tucker Trips',
  description: 'Read the terms and conditions for using Tucker Trips, the travel planning platform for your trusted circle.',
}

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: November 6, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Tucker Trips</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) govern your use of Tucker Trips, a travel planning and sharing 
              platform designed to help you organize trips and share experiences with your trusted circle of 
              friends and family. By using Tucker Trips, you agree to these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Tucker Trips is operated by [Company Name] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our 
              service, you agree to be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By creating an account, accessing, or using Tucker Trips, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may 
              not use our service.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              You must be at least 13 years old to use Tucker Trips. If you are under 18, you represent that 
              you have your parent&apos;s or guardian&apos;s permission to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tucker Trips provides a platform where you can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Plan and organize your travel itineraries</li>
              <li>Track flights, accommodations, activities, and transportation</li>
              <li>Upload photos and create travel memories</li>
              <li>Share trip details with friends and family</li>
              <li>Chat with your travel companions</li>
              <li>Discover trips shared by your circle</li>
              <li>Rate and review your travel experiences</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our service is designed to facilitate sharing within your personal network—friends and family 
              whose travel experiences you trust—rather than with strangers on the internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts and Security</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You must provide accurate, current, and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your password</li>
              <li>You agree to notify us immediately of any unauthorized use of your account</li>
              <li>You may have only one account per email address</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Account Security</h3>
            <p className="text-gray-700 leading-relaxed">
              You are solely responsible for all activities that occur under your account. We recommend using 
              a strong, unique password and logging out of your account when using shared or public computers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content and Conduct</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of all content you submit to Tucker Trips, including trip details, photos, 
              reviews, and messages. By sharing content, you grant us a limited license to display, store, and 
              share that content as necessary to provide our services.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Acceptable Use</h3>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to use Tucker Trips to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Share false, misleading, or fraudulent information</li>
              <li>Upload content that violates intellectual property rights</li>
              <li>Post inappropriate, offensive, or harmful content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to other accounts or systems</li>
              <li>Use the service for commercial purposes without permission</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Content Guidelines</h3>
            <p className="text-gray-700 leading-relaxed">
              Tucker Trips is designed for authentic travel sharing among trusted circles. We reserve the right 
              to remove content that violates these guidelines or disrupts the community experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
              use, and protect your information.
            </p>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Trip Sharing</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Private:</strong> Only visible to you</li>
              <li><strong>Shared:</strong> Visible to specific people you invite</li>
              <li><strong>Link Sharing:</strong> Accessible to anyone with the link</li>
              <li><strong>Public:</strong> Visible to other Tucker Trips users for inspiration</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You control the visibility of each trip and can change these settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Tucker Trips Property</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tucker Trips, including our logo, design, features, and functionality, is owned by us and 
              protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">User Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You warrant that you own or have the right to share all content you upload to Tucker Trips. 
              You are responsible for ensuring your content doesn&apos;t infringe on others&apos; intellectual property rights.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">License to Use</h3>
            <p className="text-gray-700 leading-relaxed">
              We grant you a limited, non-exclusive, non-transferable license to use Tucker Trips for personal, 
              non-commercial purposes in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tucker Trips may integrate with or link to third-party services (such as airlines, hotels, or 
              booking platforms) for your convenience. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>The availability, accuracy, or content of third-party services</li>
              <li>Third-party pricing, policies, or terms of service</li>
              <li>Transactions you complete with third parties</li>
              <li>Any issues arising from your use of third-party services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to provide reliable service, but Tucker Trips is provided &quot;as is&quot; and &quot;as available.&quot; 
              We may experience downtime for maintenance, updates, or technical issues. We do not guarantee 
              uninterrupted access to our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">No Travel Advice</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tucker Trips is a planning tool, not a travel advisor. We do not provide travel recommendations, 
              safety advice, or booking services. You are responsible for your travel decisions and safety.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">User-Generated Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Trip information, reviews, and recommendations shared by users reflect their personal experiences. 
              We do not verify the accuracy of user-generated content and are not liable for any decisions 
              you make based on such content.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, Tucker Trips and its team shall not be liable for any 
              indirect, incidental, special, or consequential damages arising from your use of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Termination</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">By You</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may close your account at any time through your profile settings or by contacting us. 
              Upon account closure, your public content may remain visible, but your personal information 
              will be deleted according to our Privacy Policy.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">By Us</h3>
            <p className="text-gray-700 leading-relaxed">
              We may suspend or terminate your account if you violate these Terms, engage in harmful behavior, 
              or for other legitimate business reasons. We will provide reasonable notice when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time to reflect changes in our service or legal requirements. 
              We will notify you of material changes via email or through our platform. Your continued use of 
              Tucker Trips after such changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibent text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
              without regard to its conflict of law principles. Any disputes arising under these Terms shall 
              be resolved in the courts of [Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> legal@tuckertrips.com</p>
              <p className="text-gray-700"><strong>Mail:</strong> Tucker Trips Legal Team<br />
              [Company Address]</p>
              <p className="text-gray-700 mt-4">
                We typically respond to legal inquiries within 5 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
              Tucker Trips regarding your use of our service and supersede all prior agreements and understandings.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}