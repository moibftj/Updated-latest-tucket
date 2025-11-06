'use client'

import { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plane, Hotel, Car, Utensils, MapPin, Star, Upload, Trash2, Plus, Save, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { tripApi } from '@/lib/api'

const NewTripModal = ({ open, onClose, onSuccess, tripToCopy = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  // Initialize form state with either empty data or copied trip data
  const [tripForm, setTripForm] = useState({
    // General Trip Information
    title: tripToCopy?.title || '',
    location: tripToCopy?.destination || '',
    rating: tripToCopy?.rating || 0,
    startDate: tripToCopy?.startDate || '',
    endDate: tripToCopy?.endDate || '',
    status: tripToCopy?.status || 'future',
    visibility: tripToCopy?.visibility || 'private',
    tripImages: tripToCopy?.tripImages || '',
    overallComment: tripToCopy?.overallComment || '',
    description: tripToCopy?.description || '',

    // Airline Details
    airlineRating: tripToCopy?.airlineRating || 0,
    airlineComment: tripToCopy?.airlineComment || '',
    airlineCost: tripToCopy?.airlineCost || '',
    quantityOfFlights: tripToCopy?.quantityOfFlights || '',
    bookingDate: tripToCopy?.bookingDate || '',
    airlines: tripToCopy?.airlines || [],

    // Accommodations
    accommodationRating: tripToCopy?.accommodationRating || 0,
    accommodationType: tripToCopy?.accommodationType || '',
    accommodationLinks: tripToCopy?.accommodationLinks || '',
    alternativeLinks: tripToCopy?.alternativeLinks || '',
    accommodationCost: tripToCopy?.accommodationCost || '',
    thoughtsOnCost: tripToCopy?.thoughtsOnCost || '',
    accommodationComments: tripToCopy?.accommodationComments || '',
    accommodations: tripToCopy?.accommodations || [],

    // Restaurants
    restaurantRating: tripToCopy?.restaurantRating || 0,
    diningType: tripToCopy?.diningType || '',
    kidFriendly: tripToCopy?.kidFriendly || '',
    otherOptions: tripToCopy?.otherOptions || '',
    bestThingsEaten: tripToCopy?.bestThingsEaten || '',
    restaurantComments: tripToCopy?.restaurantComments || '',
    restaurants: tripToCopy?.restaurants || [],

    // Rental Car
    rentalRating: tripToCopy?.rentalRating || 0,
    rentalCompany: tripToCopy?.rentalCompany || '',
    rentalCost: tripToCopy?.rentalCost || '',
    availability: tripToCopy?.availability || '',
    qualityOfCar: tripToCopy?.qualityOfCar || '',
    rentalDate: tripToCopy?.rentalDate || '',
    rentalComments: tripToCopy?.rentalComments || '',

    // Excursions
    excursions: tripToCopy?.excursions || '',

    // Additional fields
    weather: tripToCopy?.weather || '',
    segments: tripToCopy?.segments || []
  })

  const [uploadedFiles, setUploadedFiles] = useState([])

  // Rating component
  const RatingInput = ({ value, onChange, label }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl transition-colors"
          >
            <Star
              className={`w-6 h-6 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">({value}/10)</span>
      </div>
    </div>
  )

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles(prev => [...prev, ...files])

    // In a real app, you would upload these to a storage service
    // For now, we'll just track the file names
    const fileNames = files.map(file => file.name).join(', ')
    setTripForm(prev => ({
      ...prev,
      tripImages: prev.tripImages ? `${prev.tripImages}, ${fileNames}` : fileNames
    }))
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const submitTrip = async () => {
    if (!tripForm.title || !tripForm.location || !tripForm.startDate) {
      toast.error('Please fill in all required fields: Title, Location, and Start Date')
      return
    }

    setIsSubmitting(true)
    try {
      // Prepare data for API
      const tripData = {
        ...tripForm,
        destination: tripForm.location, // Map location to destination for compatibility
        // Convert arrays to JSONB format
        airlines: tripForm.airlines,
        accommodations: tripForm.accommodations,
        restaurants: tripForm.restaurants,
        segments: tripForm.segments
      }

      const newTrip = await tripApi.create(tripData)
      toast.success('Trip created successfully!')
      onSuccess(newTrip)

      // Reset form
      setTripForm({
        title: '', location: '', rating: 0, startDate: '', endDate: '', status: 'future',
        visibility: 'private', tripImages: '', overallComment: '', description: '',
        airlineRating: 0, airlineComment: '', airlineCost: '', quantityOfFlights: '',
        bookingDate: '', airlines: [], accommodationRating: 0, accommodationType: '',
        accommodationLinks: '', alternativeLinks: '', accommodationCost: '',
        thoughtsOnCost: '', accommodationComments: '', accommodations: [],
        restaurantRating: 0, diningType: '', kidFriendly: '', otherOptions: '',
        bestThingsEaten: '', restaurantComments: '', restaurants: [],
        rentalRating: 0, rentalCompany: '', rentalCost: '', availability: '',
        qualityOfCar: '', rentalDate: '', rentalComments: '', excursions: '',
        weather: '', segments: []
      })
      setUploadedFiles([])

    } catch (error) {
      console.error('Error creating trip:', error)
      toast.error('Failed to create trip. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {tripToCopy ? 'Copy Trip' : 'Add Trip'}
          </DialogTitle>
          <DialogDescription>
            {tripToCopy
              ? 'Edit this trip and save it as your own'
              : 'Log what future-you will forget: links, prices, timings, and those tiny hacks.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* General Trip Information */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ff34ac]" />
              General Trip Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Trip Title *</Label>
                <Input
                  placeholder="Japan Spring Adventure"
                  value={tripForm.title}
                  onChange={(e) => setTripForm({ ...tripForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Location *</Label>
                <Input
                  placeholder="Enter Your Location Here"
                  value={tripForm.location}
                  onChange={(e) => setTripForm({ ...tripForm, location: e.target.value })}
                />
              </div>
            </div>

            <RatingInput
              label="Trip Rating"
              value={tripForm.rating}
              onChange={(value) => setTripForm({ ...tripForm, rating: value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={tripForm.startDate}
                  onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={tripForm.endDate}
                  onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Trip Images</Label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-dashed border-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files (optional)
              </Button>
              {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                      <span>{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Trip Status</Label>
                <Select value={tripForm.status} onValueChange={(value) => setTripForm({ ...tripForm, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="future">Future Trip (Planning)</SelectItem>
                    <SelectItem value="taken">Trip Taken (Completed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Visibility</Label>
                <Select value={tripForm.visibility} onValueChange={(value) => setTripForm({ ...tripForm, visibility: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private (Only me)</SelectItem>
                    <SelectItem value="public">Public (Anyone can view)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Airline Details */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-500" />
              Airline Details
            </h3>

            <RatingInput
              label="Airline Rating"
              value={tripForm.airlineRating}
              onChange={(value) => setTripForm({ ...tripForm, airlineRating: value })}
            />

            <div>
              <Label>Airline Comment</Label>
              <Textarea
                placeholder="Comment Related To Airline..."
                value={tripForm.airlineComment}
                onChange={(e) => setTripForm({ ...tripForm, airlineComment: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Airline Cost</Label>
                <Input
                  type="number"
                  placeholder="$ Airline Cost"
                  value={tripForm.airlineCost}
                  onChange={(e) => setTripForm({ ...tripForm, airlineCost: e.target.value })}
                />
              </div>
              <div>
                <Label>Quantity of Flights</Label>
                <Input
                  type="number"
                  placeholder="Quantity of flights"
                  value={tripForm.quantityOfFlights}
                  onChange={(e) => setTripForm({ ...tripForm, quantityOfFlights: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Booking Date</Label>
              <Input
                type="date"
                placeholder="Date tickets were booked"
                value={tripForm.bookingDate}
                onChange={(e) => setTripForm({ ...tripForm, bookingDate: e.target.value })}
              />
            </div>
          </section>

          {/* Accommodations */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Hotel className="w-5 h-5 text-green-500" />
              Accommodations
            </h3>

            <RatingInput
              label="Accommodation Rating"
              value={tripForm.accommodationRating}
              onChange={(value) => setTripForm({ ...tripForm, accommodationRating: value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Accommodation Type</Label>
                <Input
                  placeholder="hotel, rental, other..."
                  value={tripForm.accommodationType}
                  onChange={(e) => setTripForm({ ...tripForm, accommodationType: e.target.value })}
                />
              </div>
              <div>
                <Label>Cost</Label>
                <Input
                  type="number"
                  placeholder="$ Cost"
                  value={tripForm.accommodationCost}
                  onChange={(e) => setTripForm({ ...tripForm, accommodationCost: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Links to Accommodations</Label>
              <Textarea
                placeholder="Link to accommodations"
                value={tripForm.accommodationLinks}
                onChange={(e) => setTripForm({ ...tripForm, accommodationLinks: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label>Links to Alternatives</Label>
              <Textarea
                placeholder="Link to other accommodations that you considered"
                value={tripForm.alternativeLinks}
                onChange={(e) => setTripForm({ ...tripForm, alternativeLinks: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label>Thoughts on Cost</Label>
              <Textarea
                placeholder="Thoughts on the cost"
                value={tripForm.thoughtsOnCost}
                onChange={(e) => setTripForm({ ...tripForm, thoughtsOnCost: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Accommodation Comments</Label>
              <Textarea
                placeholder="Comment..."
                value={tripForm.accommodationComments}
                onChange={(e) => setTripForm({ ...tripForm, accommodationComments: e.target.value })}
                rows={3}
              />
            </div>
          </section>

          {/* Restaurants */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              Restaurants
            </h3>

            <RatingInput
              label="Restaurant Rating"
              value={tripForm.restaurantRating}
              onChange={(value) => setTripForm({ ...tripForm, restaurantRating: value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Dining Type</Label>
                <Input
                  placeholder="dine in, take away..."
                  value={tripForm.diningType}
                  onChange={(e) => setTripForm({ ...tripForm, diningType: e.target.value })}
                />
              </div>
              <div>
                <Label>Kid/Family Friendly</Label>
                <Input
                  placeholder="Kid/Family friendly"
                  value={tripForm.kidFriendly}
                  onChange={(e) => setTripForm({ ...tripForm, kidFriendly: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Other Options</Label>
              <Textarea
                placeholder="Other restaurants that were options, but did not try"
                value={tripForm.otherOptions}
                onChange={(e) => setTripForm({ ...tripForm, otherOptions: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label>Best Things Eaten</Label>
              <Textarea
                placeholder="Best things you ate and drank"
                value={tripForm.bestThingsEaten}
                onChange={(e) => setTripForm({ ...tripForm, bestThingsEaten: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Restaurant Comments</Label>
              <Textarea
                placeholder="Comment..."
                value={tripForm.restaurantComments}
                onChange={(e) => setTripForm({ ...tripForm, restaurantComments: e.target.value })}
                rows={3}
              />
            </div>
          </section>

          {/* Rental Car */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Car className="w-5 h-5 text-purple-500" />
              Rental Car
            </h3>

            <RatingInput
              label="Rental Car Rating"
              value={tripForm.rentalRating}
              onChange={(value) => setTripForm({ ...tripForm, rentalRating: value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company</Label>
                <Input
                  placeholder="Company"
                  value={tripForm.rentalCompany}
                  onChange={(e) => setTripForm({ ...tripForm, rentalCompany: e.target.value })}
                />
              </div>
              <div>
                <Label>Cost</Label>
                <Input
                  type="number"
                  placeholder="$ Cost"
                  value={tripForm.rentalCost}
                  onChange={(e) => setTripForm({ ...tripForm, rentalCost: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Availability</Label>
                <Input
                  placeholder="Availability"
                  value={tripForm.availability}
                  onChange={(e) => setTripForm({ ...tripForm, availability: e.target.value })}
                />
              </div>
              <div>
                <Label>Rental Date</Label>
                <Input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={tripForm.rentalDate}
                  onChange={(e) => setTripForm({ ...tripForm, rentalDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Quality of Car</Label>
              <Textarea
                placeholder="Quality of Car"
                value={tripForm.qualityOfCar}
                onChange={(e) => setTripForm({ ...tripForm, qualityOfCar: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label>Rental Comments</Label>
              <Textarea
                placeholder="Comment..."
                value={tripForm.rentalComments}
                onChange={(e) => setTripForm({ ...tripForm, rentalComments: e.target.value })}
                rows={3}
              />
            </div>
          </section>

          {/* Excursions & Summary */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Excursions & Summary
            </h3>

            <div>
              <Label>Excursions / Things To Do</Label>
              <Textarea
                placeholder="Excursions/Things to do"
                value={tripForm.excursions}
                onChange={(e) => setTripForm({ ...tripForm, excursions: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label>Overall Comments</Label>
              <Textarea
                placeholder="Overall Comments"
                value={tripForm.overallComment}
                onChange={(e) => setTripForm({ ...tripForm, overallComment: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label>Weather</Label>
              <Textarea
                placeholder="Weather conditions during trip"
                value={tripForm.weather}
                onChange={(e) => setTripForm({ ...tripForm, weather: e.target.value })}
                rows={2}
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={submitTrip}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] text-white"
            >
              {isSubmitting ? 'Saving...' : tripToCopy ? 'Save as My Trip' : 'Create Trip'}
              <Save className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewTripModal