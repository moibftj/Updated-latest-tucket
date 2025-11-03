'use client'

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
  Menu,
  X,
} from 'lucide-react'
import ShinyText from '@/components/ShinyText'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'mytrips', label: 'My Trips', icon: MapPin },
  { id: 'shared', label: 'Shared Trips', icon: Share2 },
  { id: 'future', label: 'Future Trips', icon: CalendarIcon },
  { id: 'discover', label: 'Discover', icon: Compass },
]

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

const DashboardSidebar = ({
  user,
  activeSection,
  onSectionChange,
  onNewTrip,
  onProfileSettings,
  onLogout,
  isOpen,
  onToggle,
  onClose
}) => {
  const handleSectionChange = (section) => {
    onSectionChange(section)
    onClose() // Close sidebar on mobile after selection
  }

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-r border-gray-200 fixed h-full z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Plane className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TuckerTrips</h1>
          </div>

        <Button
          onClick={onNewTrip}
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
              onClick={() => handleSectionChange(id)}
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
            <Button onClick={onProfileSettings} variant="ghost" size="sm" title="Profile Settings">
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
    </>
  )
}

export default DashboardSidebar
