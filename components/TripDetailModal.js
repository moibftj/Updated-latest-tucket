'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  MapPin,
  Calendar,
  Plane,
  Hotel,
  Car,
  Utensils,
  Star,
  Eye,
  EyeOff,
  Users,
  DollarSign,
  Cloud,
  MessageSquare,
  X,
  Copy,
  Upload,
  Link
} from 'lucide-react'
import { useState } from 'react'

// Loading skeleton component for images
const ImageSkeleton = () => (
  <div className="absolute inset-0 bg-gray-200 animate-pulse">
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
  </div>
)

// Rating display component
const RatingDisplay = ({ rating, label }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= (rating / 2) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <span className="text-sm text-gray-600">({rating}/10)</span>
  </div>
)

const TripDetailModal = ({ trip, isOpen, onClose, showUserName = false, onCopyTrip }) => {
  const [imageLoadingStates, setImageLoadingStates] = useState({})

  if (!trip) return null

  const formatDate = (date) => {
    if (!date) return 'Not specified'
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const calculateTotalCost = () => {
    const costs = [
      parseFloat(trip.airlineCost) || 0,
      parseFloat(trip.accommodationCost) || 0,
      parseFloat(trip.rentalCost) || 0
    ]
    return costs.reduce((sum, cost) => sum + cost, 0)
  }

  const handleImageLoad = (imageKey) => {
    setImageLoadingStates(prev => ({ ...prev, [imageKey]: false }))
  }

  const handleImageError = (imageKey) => {
    setImageLoadingStates(prev => ({ ...prev, [imageKey]: false }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {trip.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-lg">{trip.destination || trip.location}</span>
                {showUserName && trip.userName && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm">by {trip.userName}</span>
                  </>
                )}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {onCopyTrip && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyTrip(trip)}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Trip
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cover Image */}
          {trip.tripImages && (
            <div className="h-64 bg-gradient-to-br from-[#ff34ac] via-pink-500 to-[#7dbbe5] rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              {trip.tripImages && (
                <>
                  {imageLoadingStates['cover'] !== false && <ImageSkeleton />}
                  <Image
                    src={trip.tripImages.split(',')[0]}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    onLoad={() => handleImageLoad('cover')}
                    onError={() => handleImageError('cover')}
                  />
                </>
              )}
            </div>
          )}

          {/* Trip Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#ff34ac]" />
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="text-sm font-medium">{formatDate(trip.startDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#7dbbe5]" />
              <div>
                <p className="text-xs text-gray-500">End Date</p>
                <p className="text-sm font-medium">{formatDate(trip.endDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Total Cost</p>
                <p className="text-sm font-medium">{formatCurrency(calculateTotalCost())}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {trip.visibility === 'public' ? (
                <Eye className="w-5 h-5 text-blue-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <p className="text-xs text-gray-500">Visibility</p>
                <p className="text-sm font-medium capitalize">{trip.visibility}</p>
              </div>
            </div>
          </div>

          {/* Rating */}
          {trip.rating > 0 && (
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <RatingDisplay rating={trip.rating} label="Trip Rating" />
            </div>
          )}

          {/* Overall Comments */}
          {trip.overallComment && (
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-gray-900">Overall Comments</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{trip.overallComment}</p>
              </div>
            </div>
          )}

          {/* Airline Details */}
          {(trip.airlineRating > 0 || trip.airlineComment || trip.airlineCost) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Plane className="w-5 h-5 text-blue-500" />
                Airline Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                {trip.airlineRating > 0 && (
                  <div className="md:col-span-2">
                    <RatingDisplay rating={trip.airlineRating} label="Airline Rating" />
                  </div>
                )}
                {trip.airlineCost && (
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-medium">{formatCurrency(trip.airlineCost)}</p>
                  </div>
                )}
                {trip.quantityOfFlights && (
                  <div>
                    <p className="text-sm text-gray-600">Number of Flights</p>
                    <p className="font-medium">{trip.quantityOfFlights}</p>
                  </div>
                )}
                {trip.bookingDate && (
                  <div>
                    <p className="text-sm text-gray-600">Booking Date</p>
                    <p className="font-medium">{formatDate(trip.bookingDate)}</p>
                  </div>
                )}
                {trip.airlineComment && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Comments</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.airlineComment}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accommodations */}
          {(trip.accommodationRating > 0 || trip.accommodationType || trip.accommodationCost) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Hotel className="w-5 h-5 text-green-500" />
                Accommodations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
                {trip.accommodationRating > 0 && (
                  <div className="md:col-span-2">
                    <RatingDisplay rating={trip.accommodationRating} label="Accommodation Rating" />
                  </div>
                )}
                {trip.accommodationType && (
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium capitalize">{trip.accommodationType}</p>
                  </div>
                )}
                {trip.accommodationCost && (
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-medium">{formatCurrency(trip.accommodationCost)}</p>
                  </div>
                )}
                {trip.accommodationLinks && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Accommodation Links</p>
                    <div className="flex flex-wrap gap-2">
                      {trip.accommodationLinks.split(',').map((link, index) => (
                        <a
                          key={index}
                          href={link.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Link className="w-3 h-3" />
                          {link.trim()}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {trip.alternativeLinks && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Alternative Options</p>
                    <div className="flex flex-wrap gap-2">
                      {trip.alternativeLinks.split(',').map((link, index) => (
                        <a
                          key={index}
                          href={link.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Link className="w-3 h-3" />
                          {link.trim()}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {trip.thoughtsOnCost && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Thoughts on Cost</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.thoughtsOnCost}</p>
                  </div>
                )}
                {trip.accommodationComments && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Comments</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.accommodationComments}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Restaurants */}
          {(trip.restaurantRating > 0 || trip.diningType || trip.bestThingsEaten) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Utensils className="w-5 h-5 text-orange-500" />
                Restaurants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg">
                {trip.restaurantRating > 0 && (
                  <div className="md:col-span-2">
                    <RatingDisplay rating={trip.restaurantRating} label="Restaurant Rating" />
                  </div>
                )}
                {trip.diningType && (
                  <div>
                    <p className="text-sm text-gray-600">Dining Type</p>
                    <p className="font-medium capitalize">{trip.diningType}</p>
                  </div>
                )}
                {trip.kidFriendly && (
                  <div>
                    <p className="text-sm text-gray-600">Kid Friendly</p>
                    <p className="font-medium">{trip.kidFriendly}</p>
                  </div>
                )}
                {trip.bestThingsEaten && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Best Things Eaten</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.bestThingsEaten}</p>
                  </div>
                )}
                {trip.otherOptions && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Other Options Considered</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.otherOptions}</p>
                  </div>
                )}
                {trip.restaurantComments && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Comments</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.restaurantComments}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rental Car */}
          {(trip.rentalRating > 0 || trip.rentalCompany || trip.rentalCost) && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Car className="w-5 h-5 text-purple-500" />
                Rental Car
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                {trip.rentalRating > 0 && (
                  <div className="md:col-span-2">
                    <RatingDisplay rating={trip.rentalRating} label="Rental Car Rating" />
                  </div>
                )}
                {trip.rentalCompany && (
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium">{trip.rentalCompany}</p>
                  </div>
                )}
                {trip.rentalCost && (
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-medium">{formatCurrency(trip.rentalCost)}</p>
                  </div>
                )}
                {trip.availability && (
                  <div>
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className="font-medium">{trip.availability}</p>
                  </div>
                )}
                {trip.rentalDate && (
                  <div>
                    <p className="text-sm text-gray-600">Rental Date</p>
                    <p className="font-medium">{formatDate(trip.rentalDate)}</p>
                  </div>
                )}
                {trip.qualityOfCar && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Quality of Car</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.qualityOfCar}</p>
                  </div>
                )}
                {trip.rentalComments && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Comments</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{trip.rentalComments}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Excursions & Activities */}
          {trip.excursions && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Star className="w-5 h-5 text-yellow-500" />
                Excursions & Things To Do
              </h3>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{trip.excursions}</p>
              </div>
            </div>
          )}

          {/* Weather */}
          {trip.weather && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Cloud className="w-5 h-5 text-blue-400" />
                Weather
              </h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{trip.weather}</p>
              </div>
            </div>
          )}

          {/* Additional Images */}
          {trip.tripImages && trip.tripImages.includes(',') && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
                <Upload className="w-5 h-5 text-gray-500" />
                Trip Photos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trip.tripImages.split(',').slice(1).map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                    {imageLoadingStates[`image-${index}`] !== false && <ImageSkeleton />}
                    <Image
                      src={image.trim()}
                      alt={`${trip.title} - Photo ${index + 2}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      onLoad={() => handleImageLoad(`image-${index}`)}
                      onError={() => handleImageError(`image-${index}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Status and Created Date */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Badge variant={trip.status === 'taken' ? 'default' : 'secondary'}>
                {trip.status === 'taken' ? 'Completed' : 'Future Trip'}
              </Badge>
              <span className="text-sm text-gray-500">
                Created on {formatDate(trip.createdAt)}
              </span>
            </div>
            {trip.updatedAt && trip.updatedAt !== trip.createdAt && (
              <span className="text-sm text-gray-500">
                Updated on {formatDate(trip.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TripDetailModal