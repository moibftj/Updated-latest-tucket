'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, Trash2, Plus, Plane, Hotel as HotelIcon } from 'lucide-react'
import { toast } from 'sonner'
import { tripApi } from '@/lib/api'

const StarRating = ({ value, onChange, disabled }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => !disabled && onChange(star)}
          disabled={disabled}
          className={`transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          <Star
            className={`w-6 h-6 ${
              star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

const TripModal = ({ open, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [tripForm, setTripForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    status: 'future',
    visibility: 'private',
    coverPhoto: '',
    tripImages: '',
    weather: '',
    overallComment: '',
    transportations: [],
    accommodations: [],
    segments: []
  })

  const [currentTransport, setCurrentTransport] = useState({
    type: 'flight',
    airline: '',
    flightNumber: '',
    departureTime: '',
    arrivalTime: '',
    cost: '',
    rating: 0,
    qualityMetric: '',
    details: ''
  })

  const [currentAccommodation, setCurrentAccommodation] = useState({
    type: 'hotel',
    name: '',
    address: '',
    checkIn: '',
    checkOut: '',
    cost: '',
    url: '',
    otherUrl: '',
    rating: 0,
    excursionDetails: ''
  })

  const addTransportation = () => {
    if (!currentTransport.airline && !currentTransport.details) {
      toast.error('Please fill in transportation details')
      return
    }

    const transport = { id: Date.now(), ...currentTransport }
    const segment = {
      id: transport.id,
      type: transport.type === 'flight' ? 'flight' : 'transport',
      airline: transport.airline,
      flightNumber: transport.flightNumber,
      details: transport.details,
      price: transport.cost
    }
    setTripForm(prev => ({
      ...prev,
      transportations: [...prev.transportations, transport],
      segments: [...prev.segments, segment]
    }))

    setCurrentTransport({
      type: 'flight',
      airline: '',
      flightNumber: '',
      departureTime: '',
      arrivalTime: '',
      cost: '',
      rating: 0,
      qualityMetric: '',
      details: ''
    })

    toast.success('Transportation added')
  }

  const removeTransportation = (id) => {
    setTripForm(prev => ({
      ...prev,
      transportations: prev.transportations.filter(t => t.id !== id),
      segments: prev.segments.filter(segment => segment.id !== id)
    }))
  }

  const addAccommodation = () => {
    if (!currentAccommodation.name) {
      toast.error('Please enter accommodation name')
      return
    }

    const accommodation = { id: Date.now(), ...currentAccommodation }
    setTripForm(prev => ({
      ...prev,
      accommodations: [...prev.accommodations, accommodation],
      segments: [
        ...prev.segments,
        {
          id: accommodation.id,
          type: 'accommodation',
          name: accommodation.name,
          price: accommodation.cost
        }
      ]
    }))

    setCurrentAccommodation({
      type: 'hotel',
      name: '',
      address: '',
      checkIn: '',
      checkOut: '',
      cost: '',
      url: '',
      otherUrl: '',
      rating: 0,
      excursionDetails: ''
    })

    toast.success('Accommodation added')
  }

  const removeAccommodation = (id) => {
    setTripForm(prev => ({
      ...prev,
      accommodations: prev.accommodations.filter(a => a.id !== id),
      segments: prev.segments.filter(segment => segment.id !== id)
    }))
  }

  const submitTrip = async () => {
    if (!tripForm.title || !tripForm.destination || !tripForm.startDate) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const { transportations: _transportations, ...payload } = tripForm
      const newTrip = await tripApi.create(payload)
      onSuccess(newTrip)
      setCurrentStep(1)
      setTripForm({
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        description: '',
        status: 'future',
        visibility: 'private',
        coverPhoto: '',
        tripImages: '',
        weather: '',
        overallComment: '',
        transportations: [],
        accommodations: [],
        segments: []
      })
    } catch (error) {
      toast.error('Failed to create trip')
    }
  }

  const isTaken = tripForm.status === 'taken'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>Step {currentStep} of 5</DialogDescription>
        </DialogHeader>

        {/* Step 1: Trip Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Trip Details</h3>

            <div>
              <Label>Trip Name *</Label>
              <Input
                placeholder="Hawaii Adventure"
                value={tripForm.title}
                onChange={(e) => setTripForm({ ...tripForm, title: e.target.value })}
              />
            </div>

            <div>
              <Label>Destination *</Label>
              <Input
                placeholder="Honolulu, Hawaii"
                value={tripForm.destination}
                onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <Label>Description</Label>
              <Textarea
                placeholder="Brief overview of your trip..."
                value={tripForm.description}
                onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Trip Status</Label>
              <RadioGroup value={tripForm.status} onValueChange={(value) => setTripForm({ ...tripForm, status: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="future" id="future" />
                  <Label htmlFor="future" className="font-normal cursor-pointer">Future Trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="taken" id="taken" />
                  <Label htmlFor="taken" className="font-normal cursor-pointer">Already Taken</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Visibility</Label>
              <RadioGroup value={tripForm.visibility} onValueChange={(value) => setTripForm({ ...tripForm, visibility: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="font-normal cursor-pointer">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="font-normal cursor-pointer">Public</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setCurrentStep(2)} className="bg-purple-600 hover:bg-purple-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Transportation */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center">
              <Plane className="w-5 h-5 mr-2" />
              Transportation
            </h3>

            <div>
              <Label>Transportation Type</Label>
              <Select value={currentTransport.type} onValueChange={(value) => setCurrentTransport({ ...currentTransport, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="car">Car Rental</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentTransport.type === 'flight' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Airline</Label>
                    <Input
                      placeholder="Delta Airlines"
                      value={currentTransport.airline}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, airline: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Flight Number</Label>
                    <Input
                      placeholder="DL123"
                      value={currentTransport.flightNumber}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, flightNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Departure Time</Label>
                    <Input
                      type="datetime-local"
                      value={currentTransport.departureTime}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, departureTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Arrival Time</Label>
                    <Input
                      type="datetime-local"
                      value={currentTransport.arrivalTime}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, arrivalTime: e.target.value })}
                    />
                  </div>
                </div>

                {isTaken && (
                  <div>
                    <Label>Flight Quality (1-10)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={currentTransport.qualityMetric}
                      onChange={(e) => setCurrentTransport({ ...currentTransport, qualityMetric: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}

            {currentTransport.type !== 'flight' && (
              <div>
                <Label>Details</Label>
                <Textarea
                  placeholder="Transportation details..."
                  value={currentTransport.details}
                  onChange={(e) => setCurrentTransport({ ...currentTransport, details: e.target.value })}
                  rows={3}
                />
              </div>
            )}

            <div>
              <Label>Cost</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={currentTransport.cost}
                onChange={(e) => setCurrentTransport({ ...currentTransport, cost: e.target.value })}
              />
            </div>

            {isTaken && (
              <div>
                <Label>Rating</Label>
                <StarRating
                  value={currentTransport.rating}
                  onChange={(rating) => setCurrentTransport({ ...currentTransport, rating })}
                />
              </div>
            )}

            <Button onClick={addTransportation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Transportation
            </Button>

            {tripForm.transportations.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="font-medium">Added Transportation:</h4>
                {tripForm.transportations.map(transport => (
                  <div key={transport.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span>
                      {transport.type === 'flight' ? transport.airline : transport.type} - ${transport.cost || '0'}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => removeTransportation(transport.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="bg-purple-600 hover:bg-purple-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Accommodation */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center">
              <HotelIcon className="w-5 h-5 mr-2" />
              Accommodation
            </h3>

            <div>
              <Label>Accommodation Type</Label>
              <Select value={currentAccommodation.type} onValueChange={(value) => setCurrentAccommodation({ ...currentAccommodation, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Name</Label>
              <Input
                placeholder="Hilton Waikiki Beach"
                value={currentAccommodation.name}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, name: e.target.value })}
              />
            </div>

            <div>
              <Label>Address</Label>
              <Input
                placeholder="123 Beach St, Honolulu, HI"
                value={currentAccommodation.address}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Check-in Date</Label>
                <Input
                  type="date"
                  value={currentAccommodation.checkIn}
                  onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, checkIn: e.target.value })}
                />
              </div>
              <div>
                <Label>Check-out Date</Label>
                <Input
                  type="date"
                  value={currentAccommodation.checkOut}
                  onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, checkOut: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Cost</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={currentAccommodation.cost}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, cost: e.target.value })}
              />
            </div>

            <div>
              <Label>Booking URL</Label>
              <Input
                placeholder="https://booking.com/..."
                value={currentAccommodation.url}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, url: e.target.value })}
              />
            </div>

            <div>
              <Label>Alternate URL</Label>
              <Input
                placeholder="https://hotels.com/..."
                value={currentAccommodation.otherUrl}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, otherUrl: e.target.value })}
              />
            </div>

            {isTaken && (
              <>
                <div>
                  <Label>Rating</Label>
                  <StarRating
                    value={currentAccommodation.rating}
                    onChange={(rating) => setCurrentAccommodation({ ...currentAccommodation, rating })}
                  />
                </div>

                <div>
                  <Label>Experience Details</Label>
                  <Textarea
                    placeholder="How was your stay? Any tips or highlights?"
                    value={currentAccommodation.excursionDetails}
                    onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, excursionDetails: e.target.value })}
                    rows={3}
                  />
                </div>
              </>
            )}

            <Button onClick={addAccommodation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Accommodation
            </Button>

            {tripForm.accommodations.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="font-medium">Added Accommodations:</h4>
                {tripForm.accommodations.map(accommodation => (
                  <div key={accommodation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span>
                      {accommodation.name} ({accommodation.type}) - ${accommodation.cost || '0'}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => removeAccommodation(accommodation.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(4)} className="bg-purple-600 hover:bg-purple-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Media & Context */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Photos & Context</h3>

            <div>
              <Label>Cover Photo URL</Label>
              <Input
                placeholder="https://images.unsplash.com/..."
                value={tripForm.coverPhoto}
                onChange={(e) => setTripForm({ ...tripForm, coverPhoto: e.target.value })}
              />
            </div>

            <div>
              <Label>Trip Images (comma-separated URLs)</Label>
              <Textarea
                placeholder="https://image1.jpg, https://image2.jpg"
                value={tripForm.tripImages}
                onChange={(e) => setTripForm({ ...tripForm, tripImages: e.target.value })}
                rows={3}
              />
            </div>

            {isTaken && (
              <div>
                <Label>Weather Conditions</Label>
                <Input
                  placeholder="Sunny, 75°F, light breeze"
                  value={tripForm.weather}
                  onChange={(e) => setTripForm({ ...tripForm, weather: e.target.value })}
                />
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Back
              </Button>
              <Button onClick={() => setCurrentStep(5)} className="bg-purple-600 hover:bg-purple-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review & Submit</h3>

            {isTaken && (
              <div>
                <Label>Overall Trip Comment</Label>
                <Textarea
                  placeholder="Share your overall experience, tips, and recommendations..."
                  value={tripForm.overallComment}
                  onChange={(e) => setTripForm({ ...tripForm, overallComment: e.target.value })}
                  rows={4}
                />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Trip Summary:</h4>
              <p><strong>Title:</strong> {tripForm.title || 'Not set'}</p>
              <p><strong>Destination:</strong> {tripForm.destination || 'Not set'}</p>
              <p><strong>Dates:</strong> {tripForm.startDate || 'Not set'} to {tripForm.endDate || 'Not set'}</p>
              <p><strong>Status:</strong> {tripForm.status}</p>
              <p><strong>Transportation items:</strong> {tripForm.transportations.length}</p>
              <p><strong>Accommodations:</strong> {tripForm.accommodations.length}</p>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                Back
              </Button>
              <Button onClick={submitTrip} className="bg-purple-600 hover:bg-purple-700">
                Create Trip
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TripModal
