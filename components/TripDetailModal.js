'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Calendar, 
  Plane, 
  Hotel, 
  Car, 
  Eye, 
  EyeOff, 
  Users,
  DollarSign,
  Cloud,
  MessageSquare,
  X
} from 'lucide-react'

const TripDetailModal = ({ trip, isOpen, onClose, showUserName = false }) => {
  if (!trip) return null

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const calculateTotalCost = () => {
    if (!trip.segments || trip.segments.length === 0) return 0
    return trip.segments.reduce((sum, segment) => sum + (parseFloat(segment.price) || 0), 0)
  }

  const getSegmentIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-5 h-5 text-blue-500" />
      case 'hotel':
      case 'accommodation':
        return <Hotel className="w-5 h-5 text-green-500" />
      case 'transport':
        return <Car className="w-5 h-5 text-purple-500" />
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {trip.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-lg">{trip.destination}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Cover Image */}
        <div className="h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg relative overflow-hidden -mt-2">
          <div className="absolute inset-0 bg-black/20"></div>
          {trip.coverPhoto && (
            <img 
              src={trip.coverPhoto} 
              alt={trip.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Trip Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(trip.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">End Date</p>
              <p className="font-medium">{formatDate(trip.endDate)}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={trip.status === 'future' ? 'default' : 'secondary'}>
            {trip.status === 'future' ? '📅 Future Trip' : '✓ Trip Taken'}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            {trip.visibility === 'public' ? (
              <>
                <Eye className="w-3 h-3" />
                Public
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                Private
              </>
            )}
          </Badge>
          {showUserName && trip.userName && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              by {trip.userName}
            </Badge>
          )}
        </div>

        <Separator />

        {/* Description */}
        {trip.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{trip.description}</p>
          </div>
        )}

        {/* Weather */}
        {trip.weather && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Weather Information
            </h3>
            <p className="text-gray-700">{trip.weather}</p>
          </div>
        )}

        {/* Itinerary */}
        {trip.segments && trip.segments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Itinerary ({trip.segments.length} items)
            </h3>
            <div className="space-y-3">
              {trip.segments.map((segment, index) => (
                <div 
                  key={segment.id || index} 
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="mt-1">{getSegmentIcon(segment.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {segment.type === 'flight' && `${segment.airline} ${segment.flightNumber}`}
                          {segment.type === 'hotel' && segment.name}
                          {segment.type === 'accommodation' && segment.name}
                          {segment.type === 'transport' && `${segment.type} - ${segment.details}`}
                        </p>
                        {segment.from && segment.to && (
                          <p className="text-sm text-gray-600 mt-1">
                            {segment.from} → {segment.to}
                          </p>
                        )}
                        {segment.checkIn && segment.checkOut && (
                          <p className="text-sm text-gray-600 mt-1">
                            Check-in: {new Date(segment.checkIn).toLocaleDateString()} | 
                            Check-out: {new Date(segment.checkOut).toLocaleDateString()}
                          </p>
                        )}
                        {segment.details && (
                          <p className="text-sm text-gray-600 mt-1">{segment.details}</p>
                        )}
                      </div>
                      {segment.price && (
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {segment.price}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Cost */}
            {calculateTotalCost() > 0 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total Estimated Cost:</span>
                  <span className="text-xl font-bold text-green-600">${calculateTotalCost().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Airlines */}
        {trip.airlines && trip.airlines.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Airlines
            </h3>
            <div className="flex flex-wrap gap-2">
              {trip.airlines.map((airline, index) => (
                <Badge key={index} variant="outline">{airline}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Accommodations */}
        {trip.accommodations && trip.accommodations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Hotel className="w-5 h-5" />
              Accommodations
            </h3>
            <div className="flex flex-wrap gap-2">
              {trip.accommodations.map((accommodation, index) => (
                <Badge key={index} variant="outline">{accommodation}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Overall Comment */}
        {trip.overallComment && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Overall Experience
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">{trip.overallComment}</p>
          </div>
        )}

        {/* Trip Images */}
        {trip.tripImages && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Trip Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {trip.tripImages.split(',').filter(Boolean).map((image, index) => (
                <img
                  key={index}
                  src={image.trim()}
                  alt={`Trip photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Shared With */}
        {trip.sharedWith && trip.sharedWith.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Shared With
            </h3>
            <p className="text-gray-600">{trip.sharedWith.length} user(s)</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TripDetailModal
