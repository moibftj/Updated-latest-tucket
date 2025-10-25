"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import {
  Home,
  MapPin,
  Share2,
  Calendar as CalendarIcon,
  PlusCircle,
  Compass,
  Plane,
  LogOut,
  Settings,
} from 'lucide-react'
import { toast } from 'sonner'
import TripCard from '@/components/TripCard'
import EnhancedTripModal from '@/components/EnhancedTripModal'
import ProfileSettings from '@/components/ProfileSettings'
import ChatPanel from '@/components/ChatPanel'
import ShinyText from '@/components/ShinyText'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'mytrips', label: 'My Trips', icon: MapPin },
  { id: 'shared', label: 'Shared Trips', icon: Share2 },
  { id: 'future', label: 'Future Trips', icon: CalendarIcon },
  { id: 'discover', label: 'Discover', icon: Compass },
]

const HOME_LINKS = [
  {
    id: 'shared',
    title: 'Shared Trips',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    action: 'section',
  },
  {
    id: 'future',
    title: 'Future Trips',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
    action: 'section',
  },
  {
    id: 'mytrips',
    title: 'My Trips',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    action: 'section',
  },
  {
    id: 'new',
    title: 'New Trip Form',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400',
    action: 'newTrip',
  },
]

const TRIP_SECTION_META = {
  mytrips: {
    title: 'My Trips',
    emptyMessage: "You haven't taken any trips yet. Start planning your first adventure!",
    showCreateButton: true,
    canDelete: true,
    showUserName: false,
  },
  future: {
    title: 'Future Trips',
    emptyMessage: 'No future trips planned yet. Create your first trip!',
    showCreateButton: true,
    canDelete: true,
    showUserName: false,
  },
  shared: {
    title: 'Shared Trips',
    emptyMessage: 'No trips have been shared with you yet.',
    showCreateButton: false,
    canDelete: false,
    showUserName: true,
  },
  discover: {
    title: 'Discover Public Trips',
    emptyMessage: 'No public trips available yet. Be the first to share a trip!',
    showCreateButton: false,
    canDelete: false,
    showUserName: true,
  },
}

const TRIP_TIPS = [
  'Clone popular trips as a starting point for your own adventures',
  'Break down your itinerary by day for easier planning',
  'Track expenses for each day to manage your travel budget',
]

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
)

const SectionHeader = ({ title, showCreateButton, onNewTrip }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    {showCreateButton && (
      <Button onClick={onNewTrip} className="bg-purple-600 hover:bg-purple-700">
        <PlusCircle className="w-5 h-5 mr-2" />
        <ShinyText text="New Trip" speed={3} />
      </Button>
    )}
  </div>
)

const EmptyState = ({ message, onNewTrip, showCreateButton }) => (
  <div className="text-center py-16 bg-gray-50 rounded-lg">
    <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full w-fit">
      <MapPin className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
    <p className="text-gray-500 mb-6">{message}</p>
    {showCreateButton && (
      <Button onClick={onNewTrip} className="bg-purple-600 hover:bg-purple-700">
        <PlusCircle className="w-5 h-5 mr-2" />
        Create Your First Trip
      </Button>
    )}
  </div>
)

const TripsSection = ({ config, trips, isLoading, onNewTrip, onDelete }) => {
  if (!config) {
    return null
  }

  const { title, emptyMessage, showCreateButton, canDelete, showUserName } = config

  return (
    <div>
      <SectionHeader title={title} showCreateButton={showCreateButton} onNewTrip={onNewTrip} />
      {isLoading ? (
        <Loader />
      ) : trips.length === 0 ? (
        <EmptyState message={emptyMessage} onNewTrip={onNewTrip} showCreateButton={showCreateButton} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={canDelete ? onDelete : undefined}
              showUserName={showUserName}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const QuickLinkCard = ({ title, image, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <span className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
      <span className="text-2xl font-bold text-white">{title}</span>
    </span>
  </button>
)

const HomeSection = ({ user, onSelectSection, onNewTrip }) => (
  <div>
    <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h2>
      <p className="text-gray-600">
        Explore the different sections of TuckerTrips to plan, share, and discover travel adventures.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {HOME_LINKS.map(({ id, title, image, action }) => (
        <QuickLinkCard
          key={id}
          title={title}
          image={image}
          onClick={action === 'section' ? () => onSelectSection(id) : onNewTrip}
        />
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Planning Tips</h3>
        <ul className="space-y-3">
          {TRIP_TIPS.map((tip) => (
            <li key={tip} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Active Users</h3>
        <p className="text-gray-500">This feature will show active users in your network.</p>
      </div>
    </div>
  </div>
)

const NavItemButton = ({ isActive, onClick, Icon, label }) => {
  const stateClasses = isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${stateClasses}`}
      type="button"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  )
}

const Dashboard = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser)
  const [activeSection, setActiveSection] = useState('home')
  const [trips, setTrips] = useState([])
  const [publicTrips, setPublicTrips] = useState([])
  const [sharedTrips, setSharedTrips] = useState([])
  const [showNewTripModal, setShowNewTripModal] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [loading, setLoading] = useState(true)

  const requestWithAuth = useCallback((url, options = {}) => {
    const token = localStorage.getItem('token')
    return fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    })
  }, [])

  const loadTrips = useCallback(
    async (endpoint, setter) => {
      setLoading(true)
      try {
        const response = await requestWithAuth(endpoint)
        if (response.ok) {
          const data = await response.json()
          setter(data)
        }
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error)
      } finally {
        setLoading(false)
      }
    },
    [requestWithAuth]
  )

  const fetchTrips = useCallback(() => loadTrips('/api/trips', setTrips), [loadTrips])
  const fetchPublicTrips = useCallback(() => loadTrips('/api/trips/public/all', setPublicTrips), [loadTrips])
  const fetchSharedTrips = useCallback(() => loadTrips('/api/trips/shared', setSharedTrips), [loadTrips])

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  useEffect(() => {
    if (activeSection === 'discover') {
      fetchPublicTrips()
    } else if (activeSection === 'shared') {
      fetchSharedTrips()
    }
  }, [activeSection, fetchPublicTrips, fetchSharedTrips])

  const deleteTrip = useCallback(
    async (tripId) => {
      try {
        const response = await requestWithAuth(`/api/trips/${tripId}`, { method: 'DELETE' })

        if (response.ok) {
          setTrips((prev) => prev.filter((t) => t.id !== tripId))
          toast.success('Trip deleted')
        } else {
          toast.error('Failed to delete trip')
        }
      } catch (error) {
        toast.error('Failed to delete trip')
      }
    },
    [requestWithAuth]
  )

  const myTrips = trips.filter((t) => t.status === 'taken')
  const futureTrips = trips.filter((t) => t.status === 'future')

  const sectionConfig = {
    mytrips: { ...TRIP_SECTION_META.mytrips, trips: myTrips },
    future: { ...TRIP_SECTION_META.future, trips: futureTrips },
    shared: { ...TRIP_SECTION_META.shared, trips: sharedTrips },
    discover: { ...TRIP_SECTION_META.discover, trips: publicTrips },
  }

  const handleTripCreated = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev])
    setShowNewTripModal(false)
    toast.success('Trip created successfully!')
  }

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser)
  }

  const activeConfig = sectionConfig[activeSection]

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
            <ShinyText text="New Trip" speed={3} />
          </Button>

          <nav className="space-y-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <NavItemButton
                key={id}
                isActive={activeSection === id}
                onClick={() => setActiveSection(id)}
                Icon={Icon}
                label={label}
              />
            ))}
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
          {user.bio && <p className="text-xs text-gray-500 truncate">{user.bio}</p>}
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        {activeSection === 'home' ? (
          <HomeSection
            user={user}
            onSelectSection={setActiveSection}
            onNewTrip={() => setShowNewTripModal(true)}
          />
        ) : (
          <TripsSection
            config={activeConfig}
            trips={activeConfig?.trips ?? []}
            isLoading={loading}
            onNewTrip={() => setShowNewTripModal(true)}
            onDelete={deleteTrip}
          />
        )}
      </main>

      <EnhancedTripModal
        open={showNewTripModal}
        onClose={() => setShowNewTripModal(false)}
        onSuccess={handleTripCreated}
      />

      <ProfileSettings
        open={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
        user={user}
        onUserUpdate={handleUserUpdate}
      />

      <ChatPanel currentUser={user} />
    </div>
  )
}

export default Dashboard
