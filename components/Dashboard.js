'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Home, MapPin, Share2, Calendar as CalendarIcon, PlusCircle, Compass, Plane, LogOut, Settings } from 'lucide-react'
import { toast } from 'sonner'
import TripCard from '@/components/TripCard'
import EnhancedTripModal from '@/components/EnhancedTripModal'
import ProfileSettings from '@/components/ProfileSettings'
import ChatPanel from '@/components/ChatPanel'

const Dashboard = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser)
  const [activeSection, setActiveSection] = useState('home')
  const [trips, setTrips] = useState([])
  const [showNewTripModal, setShowNewTripModal] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await fetch('/api/trips', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.ok) {
        const data = await response.json()
        setTrips(data)
      }
    } catch (error) {
      console.error('Failed to fetch trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.ok) {
        setTrips(prev => prev.filter(t => t.id !== tripId))
        toast.success('Trip deleted')
      }
    } catch (error) {
      toast.error('Failed to delete trip')
    }
  }

  const myTrips = trips.filter(t => t.status === 'taken')
  const futureTrips = trips.filter(t => t.status === 'future')
  const sharedTrips = [] // TODO: Implement sharing

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )
    }

    if (activeSection === 'home') {
      return (
        <div>
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h2>
            <p className="text-gray-600">Explore the different sections of TuckerTrips to plan, share, and discover travel adventures.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              onClick={() => setActiveSection('shared')}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400')" }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Shared Trips</h3>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('future')}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400')" }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Future Trips</h3>
              </div>
            </div>

            <div 
              onClick={() => setActiveSection('mytrips')}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400')" }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">My Trips</h3>
              </div>
            </div>

            <div 
              onClick={() => setShowNewTripModal(true)}
              className="cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400')" }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">New Trip Form</h3>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Planning Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Clone popular trips as a starting point for your own adventures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Break down your itinerary by day for easier planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Track expenses for each day to manage your travel budget</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Active Users</h3>
              <p className="text-gray-500">This feature will show active users in your network.</p>
            </div>
          </div>
        </div>
      )
    }

    const tripsToShow = activeSection === 'mytrips' ? myTrips : activeSection === 'future' ? futureTrips : sharedTrips
    const sectionTitle = activeSection === 'mytrips' ? 'My Trips' : activeSection === 'future' ? 'Future Trips' : 'Shared Trips'

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{sectionTitle}</h2>
          <Button onClick={() => setShowNewTripModal(true)} className="bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="w-5 h-5 mr-2" />
            New Trip
          </Button>
        </div>

        {tripsToShow.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full w-fit">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
            <Button onClick={() => setShowNewTripModal(true)} className="bg-purple-600 hover:bg-purple-700">
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripsToShow.map(trip => (
              <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TuckerTrips</h1>
          </div>

          <Button 
            onClick={() => setShowNewTripModal(true)}
            className="w-full mb-6 bg-purple-600 hover:bg-purple-700"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Trip
          </Button>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('home')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'home' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveSection('mytrips')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'mytrips' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>My Trips</span>
            </button>

            <button
              onClick={() => setActiveSection('shared')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'shared' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Share2 className="w-5 h-5" />
              <span>Shared Trips</span>
            </button>

            <button
              onClick={() => setActiveSection('future')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'future' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>Future Trips</span>
            </button>

            <button
              onClick={() => setActiveSection('discover')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'discover' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Discover</span>
            </button>
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Recent Trips</h3>
            <p className="text-sm text-gray-400">No recent trips found</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">{user.name}</span>
            </div>
            <div className="flex space-x-1">
              <Button onClick={() => setShowProfileSettings(true)} variant="ghost" size="sm" title="Profile Settings">
                <Settings className="w-4 h-4" />
              </Button>
              <Button onClick={onLogout} variant="ghost" size="sm" title="Logout">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {user.bio && (
            <p className="text-xs text-gray-500 truncate">{user.bio}</p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {renderContent()}
      </main>

      {/* New Trip Modal */}
      <NewTripModal 
        open={showNewTripModal}
        onClose={() => setShowNewTripModal(false)}
        onSuccess={(newTrip) => {
          setTrips(prev => [newTrip, ...prev])
          setShowNewTripModal(false)
          toast.success('Trip created successfully!')
        }}
      />

      {/* Profile Settings Modal */}
      <ProfileSettings 
        open={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
        user={user}
        onUserUpdate={setUser}
      />

      {/* Live Chat Panel */}
      <ChatPanel currentUser={user} />
    </div>
  )
}

export default Dashboard
