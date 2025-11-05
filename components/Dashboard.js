'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import DashboardSidebar from '@/components/DashboardSidebar'
import HomeSection from '@/components/home/HomeSection'
import TripsSection from '@/components/trips/TripsSection'
import NewTripModal from '@/components/NewTripModal'
import TripDetailModal from '@/components/TripDetailModal'
import ProfileSettings from '@/components/ProfileSettings'
import ChatPanel from '@/components/ChatPanel'
import ErrorBoundary from '@/components/ErrorBoundary'
import { DashboardErrorFallback } from '@/components/ErrorFallbacks'
import { tripApi } from '@/lib/api'
import { logger } from '@/lib/logger'

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

const Dashboard = ({ user: initialUser, onLogout }) => {
  const [user, setUser] = useState(initialUser)
  const [activeSection, setActiveSection] = useState('home')
  const [trips, setTrips] = useState([])
  const [publicTrips, setPublicTrips] = useState([])
  const [sharedTrips, setSharedTrips] = useState([])
  const [showNewTripModal, setShowNewTripModal] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showTripDetail, setShowTripDetail] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Pagination states
  const [myTripsPage, setMyTripsPage] = useState(1)
  const [publicTripsPage, setPublicTripsPage] = useState(1)
  const [sharedTripsPage, setSharedTripsPage] = useState(1)
  const [myTripsPagination, setMyTripsPagination] = useState(null)
  const [publicTripsPagination, setPublicTripsPagination] = useState(null)
  const [sharedTripsPagination, setSharedTripsPagination] = useState(null)

  const loadTrips = useCallback(
    async (apiMethod, setter, page, setPagination) => {
      setLoading(true)
      try {
        const response = await apiMethod(page)
        // Handle both old format (array) and new format (object with pagination)
        if (Array.isArray(response)) {
          setter(response)
        } else {
          setter(response.trips || [])
          if (setPagination) {
            setPagination(response.pagination)
          }
        }
      } catch (error) {
        logger.error('Failed to fetch trips:', error)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const fetchTrips = useCallback(() => loadTrips(tripApi.getAll, setTrips, myTripsPage, setMyTripsPagination), [loadTrips, myTripsPage])
  const fetchPublicTrips = useCallback(() => loadTrips(tripApi.getPublic, setPublicTrips, publicTripsPage, setPublicTripsPagination), [loadTrips, publicTripsPage])
  const fetchSharedTrips = useCallback(() => loadTrips(tripApi.getShared, setSharedTrips, sharedTripsPage, setSharedTripsPagination), [loadTrips, sharedTripsPage])

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

  const deleteTrip = useCallback(async (tripId) => {
    try {
      await tripApi.delete(tripId)
      setTrips((prev) => prev.filter((t) => t.id !== tripId))
      toast.success('Trip deleted')
    } catch (error) {
      toast.error('Failed to delete trip')
    }
  }, [])

  const myTrips = trips.filter((t) => t.status === 'taken')
  const futureTrips = trips.filter((t) => t.status === 'future')

  const sectionConfig = {
    mytrips: {
      ...TRIP_SECTION_META.mytrips,
      trips: myTrips,
      pagination: myTripsPagination,
      onPageChange: setMyTripsPage,
    },
    future: {
      ...TRIP_SECTION_META.future,
      trips: futureTrips,
      pagination: myTripsPagination,
      onPageChange: setMyTripsPage,
    },
    shared: {
      ...TRIP_SECTION_META.shared,
      trips: sharedTrips,
      pagination: sharedTripsPagination,
      onPageChange: setSharedTripsPage,
    },
    discover: {
      ...TRIP_SECTION_META.discover,
      trips: publicTrips,
      pagination: publicTripsPagination,
      onPageChange: setPublicTripsPage,
    },
  }

  const handleTripCreated = (newTrip) => {
    setTrips((prev) => [newTrip, ...prev])
    setShowNewTripModal(false)
    toast.success('Trip created successfully!')
  }

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser)
  }

  const handleTripClick = (trip) => {
    setSelectedTrip(trip)
    setShowTripDetail(true)
  }

  const handleCloseTripDetail = () => {
    setShowTripDetail(false)
    setSelectedTrip(null)
  }

  const activeConfig = sectionConfig[activeSection]

  return (
    <ErrorBoundary fallback={DashboardErrorFallback}>
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onNewTrip={() => setShowNewTripModal(true)}
          onProfileSettings={() => setShowProfileSettings(true)}
          onLogout={onLogout}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
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
              onTripClick={handleTripClick}
            />
          )}
        </main>

        <NewTripModal
          open={showNewTripModal}
          onClose={() => setShowNewTripModal(false)}
          onSuccess={handleTripCreated}
        />

        <TripDetailModal
          trip={selectedTrip}
          isOpen={showTripDetail}
          onClose={handleCloseTripDetail}
          showUserName={activeSection === 'shared' || activeSection === 'discover'}
        />

        <ProfileSettings
          open={showProfileSettings}
          onClose={() => setShowProfileSettings(false)}
          user={user}
          onUpdate={handleUserUpdate}
        />

        <ChatPanel currentUser={user} />
      </div>
    </ErrorBoundary>
  )
}

export default Dashboard
