'use client'

import { ArrowLeft, HelpCircle, Book, Users, Settings, Shield, Zap, Search, MessageCircle, Camera, Plane, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tucker Trips
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to know about planning trips and sharing experiences with your circle
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff34ac] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#ff34ac]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Plane className="w-5 h-5 text-[#ff34ac]" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Learn the basics of creating your first trip and inviting your circle
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-[#7dbbe5]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Share2 className="w-5 h-5 text-[#7dbbe5]" />
                Sharing & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Control who sees your trips and manage your privacy settings
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Camera className="w-5 h-5 text-green-500" />
                Trip Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Explore all the ways to document and organize your adventures
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <Settings className="w-5 h-5 text-purple-500" />
                Account & Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Manage your profile, notifications, and account preferences
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {/* Getting Started */}
                <AccordionItem value="getting-started" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#ff34ac]" />
                      How do I get started with Tucker Trips?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Getting started is easy! Here's your step-by-step guide:</p>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li><strong>Sign Up:</strong> Create your account with your email and choose a secure password</li>
                        <li><strong>Complete Your Profile:</strong> Add your name and a brief bio to help your circle recognize you</li>
                        <li><strong>Create Your First Trip:</strong> Click "New Trip" and add your destination, dates, and basic details</li>
                        <li><strong>Add Trip Details:</strong> Include flights, hotels, activities, and any notes about your experience</li>
                        <li><strong>Share with Your Circle:</strong> Invite friends and family to see your trip and get their input</li>
                      </ol>
                      <p className="bg-blue-50 p-3 rounded-md">
                        💡 <strong>Pro Tip:</strong> Start by adding a recent trip to get familiar with the features before planning your next adventure!
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Trip Creation */}
                <AccordionItem value="trip-creation" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#ff34ac]" />
                      How do I create and organize a trip?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Creating a comprehensive trip is simple:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Basic Information:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Trip title and destination</li>
                            <li>Start and end dates</li>
                            <li>Trip status (Future or Completed)</li>
                            <li>Visibility settings</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Trip Segments:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Flights:</strong> Airlines, times, costs</li>
                            <li><strong>Hotels:</strong> Locations, ratings, prices</li>
                            <li><strong>Activities:</strong> Tours, experiences, tips</li>
                            <li><strong>Transportation:</strong> Rentals, transfers, local transport</li>
                          </ul>
                        </div>
                      </div>
                      <p>You can add photos, notes, and ratings for each segment to help your circle make informed decisions for their own trips.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sharing & Privacy */}
                <AccordionItem value="sharing" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-[#7dbbe5]" />
                      How do sharing and privacy settings work?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Tucker Trips gives you complete control over who sees your trips:</p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-1">Private</Badge>
                          <div>
                            <p className="font-medium">Only visible to you</p>
                            <p className="text-sm text-gray-600">Perfect for planning or keeping personal trips confidential</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">Shared</Badge>
                          <div>
                            <p className="font-medium">Visible to specific people you invite</p>
                            <p className="text-sm text-gray-600">Share with family members, travel companions, or close friends by email</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">Link</Badge>
                          <div>
                            <p className="font-medium">Accessible to anyone with the link</p>
                            <p className="text-sm text-gray-600">Easy sharing without requiring email addresses</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800">Public</Badge>
                          <div>
                            <p className="font-medium">Visible to other Tucker Trips users</p>
                            <p className="text-sm text-gray-600">Help inspire other travelers in the community</p>
                          </div>
                        </div>
                      </div>
                      <p className="bg-green-50 p-3 rounded-md">
                        🔒 <strong>Your Data is Safe:</strong> We never share your information with advertisers or sell your data. Your trips are only visible to people you choose.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Photos & Memories */}
                <AccordionItem value="photos" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-green-500" />
                      How do I add photos and create memories?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Capture and share your travel memories in several ways:</p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold">Trip Cover Photo:</h4>
                          <p className="text-sm">Add a main photo that represents your trip - this shows up on trip cards and previews.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Segment Photos:</h4>
                          <p className="text-sm">Upload photos for specific flights, hotels, or activities to give your circle visual context.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Trip Notes:</h4>
                          <p className="text-sm">Add detailed notes, tips, and "what I'd do differently" insights that your friends will actually find useful.</p>
                        </div>
                      </div>
                      <p className="bg-yellow-50 p-3 rounded-md">
                        📸 <strong>Quality over Quantity:</strong> Focus on photos that tell the story of your experience - the hidden gems, the perfect timing, the unexpected moments.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chat & Communication */}
                <AccordionItem value="chat" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      How does the chat feature work?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Stay connected with your travel circle through real-time chat:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Live Planning:</strong> Chat with friends while planning your next adventure</li>
                        <li><strong>Travel Coordination:</strong> Coordinate with travel companions in real-time</li>
                        <li><strong>Experience Sharing:</strong> Get instant feedback on trip ideas and recommendations</li>
                        <li><strong>Presence Indicators:</strong> See when your friends are online and available to chat</li>
                      </ul>
                      <p>The chat panel is always accessible from your dashboard, making it easy to get advice when you need it most.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Account Management */}
                <AccordionItem value="account" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-500" />
                      How do I manage my account and settings?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <p>Access your account settings from the sidebar in your dashboard:</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Profile Settings:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Update your name and bio</li>
                            <li>Change your email address</li>
                            <li>Modify password</li>
                            <li>Profile preferences</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Privacy & Data:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Export your trip data</li>
                            <li>Delete your account</li>
                            <li>Manage sharing permissions</li>
                            <li>Notification preferences</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Troubleshooting */}
                <AccordionItem value="troubleshooting" className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-orange-500" />
                      Common issues and troubleshooting
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-4">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-red-600">Can't log in to my account</h4>
                          <p className="text-sm">Check your email and password. If you've forgotten your password, use the "Forgot Password" link on the login page.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600">Trip not showing up for shared users</h4>
                          <p className="text-sm">Verify the trip visibility is set to "Shared" and double-check the email addresses you entered.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600">Photos not uploading</h4>
                          <p className="text-sm">Ensure your images are under 10MB and in common formats (JPG, PNG). Check your internet connection.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600">Chat messages not sending</h4>
                          <p className="text-sm">Refresh the page and check your connection. Messages are delivered in real-time when both users are online.</p>
                        </div>
                      </div>
                      <p className="bg-red-50 p-3 rounded-md">
                        🚨 <strong>Still having issues?</strong> Contact our support team at support@tuckertrips.com - we typically respond within 24 hours.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Zap className="w-5 h-5 text-[#ff34ac]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/contact">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start">
                    <Plane className="w-4 h-4 mr-2" />
                    Create New Trip
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Popular Help Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#" className="text-[#ff34ac] hover:underline flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      Inviting friends to Tucker Trips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#ff34ac] hover:underline flex items-center gap-2">
                      <Camera className="w-3 h-3" />
                      Adding photos to trips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#ff34ac] hover:underline flex items-center gap-2">
                      <Share2 className="w-3 h-3" />
                      Changing trip visibility
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#ff34ac] hover:underline flex items-center gap-2">
                      <Settings className="w-3 h-3" />
                      Exporting trip data
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Tips */}
            <Card className="bg-gradient-to-br from-[#ff34ac]/10 to-[#7dbbe5]/10">
              <CardHeader>
                <CardTitle className="text-gray-900">💡 Community Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <p className="mb-3">
                  <strong>"Start with one detailed trip"</strong> - Add all the little details you wish you had known. 
                  Your future self (and friends) will thank you!
                </p>
                <p>
                  <strong>"Invite travel-loving friends first"</strong> - Your feed gets 10× better with one friend 
                  who travels frequently and shares honestly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help you make the most of Tucker Trips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
            </Link>
            <Button variant="outline">
              <Book className="w-4 h-4 mr-2" />
              Browse All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}