'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Plane, Hotel, Car, Trash2, Eye, EyeOff } from 'lucide-react'

const TripCard = ({ trip, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-700 flex items-center">
            {trip.visibility === 'public' ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
            {trip.visibility || 'Private'}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1">{trip.title}</h3>
          <p className="text-white/90 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {trip.destination}
          </p>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
        </div>
        
        {trip.segments && trip.segments.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Itinerary ({trip.segments.length} items):</p>
            {trip.segments.slice(0, 3).map(segment => (
              <div key={segment.id} className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                {segment.type === 'flight' && <Plane className="w-4 h-4 mr-2 text-blue-500" />}
                {segment.type === 'hotel' && <Hotel className="w-4 h-4 mr-2 text-green-500" />}
                {segment.type === 'accommodation' && <Hotel className="w-4 h-4 mr-2 text-green-500" />}
                {segment.type === 'transport' && <Car className="w-4 h-4 mr-2 text-purple-500" />}
                <span className="flex-1 truncate">
                  {segment.type === 'flight' && `${segment.airline} ${segment.flightNumber}`}
                  {segment.type === 'hotel' && segment.name}
                  {segment.type === 'accommodation' && segment.name}
                  {segment.type === 'transport' && `${segment.type} - ${segment.details}`}
                </span>
                {segment.price && (
                  <span className="text-xs text-gray-500">${segment.price}</span>
                )}
              </div>
            ))}
            {trip.segments.length > 3 && (
              <p className="text-xs text-gray-500 italic">+ {trip.segments.length - 3} more items</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No itinerary items yet</p>
        )}

        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <span className="text-xs text-gray-500">
            {trip.status === 'future' ? '📅 Future Trip' : '✓ Trip Taken'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(trip.id)
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TripCard
