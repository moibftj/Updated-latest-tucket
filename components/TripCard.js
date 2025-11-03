'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Plane, Hotel, Car, Trash2, Eye, EyeOff } from 'lucide-react'

const TripCard = ({ trip, onDelete, showUserName = false }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden w-full">
      {/* Cover Image */}
      <div className="h-36 sm:h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-2">
          <div className="px-2 sm:px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-700 flex items-center">
            {trip.visibility === 'public' ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
            <span className="hidden sm:inline">{trip.visibility || 'Private'}</span>
          </div>
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 line-clamp-1">{trip.title}</h3>
          <p className="text-sm sm:text-base text-white/90 flex items-center">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {trip.destination}
          </p>
          {showUserName && trip.userName && (
            <p className="text-white/80 text-sm mt-1">by {trip.userName}</p>
          )}
        </div>
      </div>

      <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
        </div>
        
        {trip.segments && trip.segments.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-gray-700">Itinerary ({trip.segments.length} items):</p>
            {trip.segments.slice(0, 3).map(segment => (
              <div key={segment.id} className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded gap-2">
                {segment.type === 'flight' && <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />}
                {segment.type === 'hotel' && <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />}
                {segment.type === 'accommodation' && <Hotel className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />}
                {segment.type === 'transport' && <Car className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />}
                <span className="flex-1 truncate min-w-0">
                  {segment.type === 'flight' && `${segment.airline} ${segment.flightNumber}`}
                  {segment.type === 'hotel' && segment.name}
                  {segment.type === 'accommodation' && segment.name}
                  {segment.type === 'transport' && `${segment.type} - ${segment.details}`}
                </span>
                {segment.price && (
                  <span className="text-xs text-gray-500 flex-shrink-0">${segment.price}</span>
                )}
              </div>
            ))}
            {trip.segments.length > 3 && (
              <p className="text-xs text-gray-500 italic">+ {trip.segments.length - 3} more items</p>
            )}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500 italic">No itinerary items yet</p>
        )}

        <div className="mt-3 sm:mt-4 flex justify-between items-center pt-3 sm:pt-4 border-t">
          <span className="text-xs text-gray-500">
            {trip.status === 'future' ? '📅 Future Trip' : '✓ Trip Taken'}
          </span>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(trip.id)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 sm:h-auto sm:w-auto sm:p-2"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default TripCard
