'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Star, Trash2, Plus } from 'lucide-react'
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

const EnhancedTripModal = ({ open, onClose, onSuccess }) => {
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
    airlines: [],
    accommodations: []
  })

  const [currentAirline, setCurrentAirline] = useState({
    rating: 0,
    name: '',
    cost: '',
    qualityOfFlight: '',
    excursion: ''
  })

  const [currentAccommodation, setCurrentAccommodation] = useState({
    rating: 0,
    type: '',
    url: '',
    otherUrl: '',
    excursion: ''
  })

  const addAirline = () => {
    if (!currentAirline.name) {
      toast.error('Please enter airline name')
      return
    }
    setTripForm(prev => ({
      ...prev,
      airlines: [...prev.airlines, { ...currentAirline, id: Date.now() }]
    }))
    setCurrentAirline({ rating: 0, name: '', cost: '', qualityOfFlight: '', excursion: '' })
    toast.success('Airline added!')
  }

  const removeAirline = (id) => {
    setTripForm(prev => ({
      ...prev,
      airlines: prev.airlines.filter(a => a.id !== id)
    }))
  }

  const addAccommodation = () => {
    if (!currentAccommodation.type) {
      toast.error('Please enter accommodation type')
      return
    }
    setTripForm(prev => ({
      ...prev,
      accommodations: [...prev.accommodations, { ...currentAccommodation, id: Date.now() }]
    }))
    setCurrentAccommodation({ rating: 0, type: '', url: '', otherUrl: '', excursion: '' })
    toast.success('Accommodation added!')
  }

  const removeAccommodation = (id) => {
    setTripForm(prev => ({
      ...prev,
      accommodations: prev.accommodations.filter(a => a.id !== id)
    }))
  }

  const submitTrip = async () => {
    if (!tripForm.title || !tripForm.destination || !tripForm.startDate) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const newTrip = await tripApi.create(tripForm)
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
        airlines: [],
        accommodations: []
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

        {/* Step 1: Basic Trip Details */}
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
              <Label>Location *</Label>
              <Input
                placeholder="Hawaii, USA"
                value={tripForm.destination}
                onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="A 10 days trip exploring the beautiful island of Hawaii. Includes beaches, volcanos and cultural landmarks"
                value={tripForm.description}
                onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label className="mb-3 block">Trip Status *</Label>
              <RadioGroup value={tripForm.status} onValueChange={(value) => setTripForm({ ...tripForm, status: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="future" id="future" />
                  <Label htmlFor="future" className="cursor-pointer">Future Trip (Planning)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="taken" id="taken" />
                  <Label htmlFor="taken" className="cursor-pointer">Trip Taken (Completed)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">Visibility *</Label>
              <RadioGroup value={tripForm.visibility} onValueChange={(value) => setTripForm({ ...tripForm, visibility: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="cursor-pointer">Private (Only me)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="cursor-pointer">Public (Anyone can view)</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={() => setCurrentStep(2)} className="w-full bg-purple-600 hover:bg-purple-700">
              Next: Airline Details
            </Button>
          </div>
        )}

        {/* Step 2: Airline Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Airline Details</h3>
              {isTaken && <StarRating value={currentAirline.rating} onChange={(val) => setCurrentAirline({ ...currentAirline, rating: val })} />}
            </div>
            {!isTaken && <p className="text-sm text-gray-500">Ratings are only available for completed trips</p>}

            <div>
              <Label>Airline Name</Label>
              <Input
                placeholder="Hawaiian Airlines"
                value={currentAirline.name}
                onChange={(e) => setCurrentAirline({ ...currentAirline, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Airline Cost ($)</Label>
                <Input
                  type="number"
                  placeholder="700"
                  value={currentAirline.cost}
                  onChange={(e) => setCurrentAirline({ ...currentAirline, cost: e.target.value })}
                />
              </div>
              <div>
                <Label>Quality of Flight (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="8"
                  value={currentAirline.qualityOfFlight}
                  onChange={(e) => setCurrentAirline({ ...currentAirline, qualityOfFlight: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Airline Excursion Details</Label>
              <Textarea
                placeholder="Booked directly through Hawaiian Airlines website. Comfortable seats with in-flight entertainment."
                value={currentAirline.excursion}
                onChange={(e) => setCurrentAirline({ ...currentAirline, excursion: e.target.value })}
                rows={3}
              />
            </div>

            <Button
              onClick={addAirline}
              variant="outline"
              className="w-full"
              disabled={!currentAirline.name}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Airline
            </Button>

            {tripForm.airlines.length > 0 && (
              <div className="space-y-2 border-t pt-4">
                <Label>Added Airlines ({tripForm.airlines.length})</Label>
                {tripForm.airlines.map(airline => (
                  <div key={airline.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="flex-1">
                      <p className="font-medium">{airline.name}</p>
                      {isTaken && airline.rating > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(airline.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeAirline(airline.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setCurrentStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Next: Accommodation
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Accommodation Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Accommodation Details</h3>
              {isTaken && <StarRating value={currentAccommodation.rating} onChange={(val) => setCurrentAccommodation({ ...currentAccommodation, rating: val })} />}
            </div>
            {!isTaken && <p className="text-sm text-gray-500">Ratings are only available for completed trips</p>}

            <div>
              <Label>Accommodation Type</Label>
              <Input
                placeholder="Resort / Hotel / Airbnb"
                value={currentAccommodation.type}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, type: e.target.value })}
              />
            </div>

            <div>
              <Label>URL to Accommodation</Label>
              <Input
                type="url"
                placeholder="www.abcresort.com"
                value={currentAccommodation.url}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, url: e.target.value })}
              />
            </div>

            <div>
              <Label>Other Accommodation Link</Label>
              <Input
                type="url"
                placeholder="www.booking.com/abc-resort"
                value={currentAccommodation.otherUrl}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, otherUrl: e.target.value })}
              />
            </div>

            <div>
              <Label>Accommodation Excursion Details</Label>
              <Textarea
                placeholder="Guided tours, snorkeling, spa service."
                value={currentAccommodation.excursion}
                onChange={(e) => setCurrentAccommodation({ ...currentAccommodation, excursion: e.target.value })}
                rows={3}
              />
            </div>

            <Button
              onClick={addAccommodation}
              variant="outline"
              className="w-full"
              disabled={!currentAccommodation.type}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Accommodation
            </Button>

            {tripForm.accommodations.length > 0 && (
              <div className="space-y-2 border-t pt-4">
                <Label>Added Accommodations ({tripForm.accommodations.length})</Label>
                {tripForm.accommodations.map(acc => (
                  <div key={acc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="flex-1">
                      <p className="font-medium">{acc.type}</p>
                      {isTaken && acc.rating > 0 && (
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(acc.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeAccommodation(acc.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setCurrentStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(4)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Next: Photos & Details
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Photos and Weather */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Photos & Weather</h3>

            <div>
              <Label>Cover Photo</Label>
              <Input
                placeholder="Cover.jpg or paste URL"
                value={tripForm.coverPhoto}
                onChange={(e) => setTripForm({ ...tripForm, coverPhoto: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Main photo for your trip</p>
            </div>

            <div>
              <Label>Trip Images</Label>
              <Input
                placeholder="4 files.jpg or paste URLs"
                value={tripForm.tripImages}
                onChange={(e) => setTripForm({ ...tripForm, tripImages: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Additional photos from your trip</p>
            </div>

            <div>
              <Label>Weather</Label>
              <Input
                placeholder="Sunny with occasional rain showers"
                value={tripForm.weather}
                onChange={(e) => setTripForm({ ...tripForm, weather: e.target.value })}
              />
            </div>

            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setCurrentStep(3)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(5)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Next: Final Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Overall Comment & Review */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Overall Comment</h3>

            <div>
              <Label>Overall Trip Comment</Label>
              <Textarea
                placeholder="Share your overall experience, highlights, tips for future travelers..."
                value={tripForm.overallComment}
                onChange={(e) => setTripForm({ ...tripForm, overallComment: e.target.value })}
                rows={6}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Trip Summary</h4>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg text-sm">
                <p><strong>Trip Name:</strong> {tripForm.title}</p>
                <p><strong>Location:</strong> {tripForm.destination}</p>
                <p><strong>Dates:</strong> {tripForm.startDate} to {tripForm.endDate || tripForm.startDate}</p>
                <p><strong>Status:</strong> {tripForm.status === 'future' ? 'Future Trip' : 'Trip Taken'}</p>
                <p><strong>Visibility:</strong> {tripForm.visibility === 'public' ? 'Public' : 'Private'}</p>
                <p><strong>Airlines:</strong> {tripForm.airlines.length} added</p>
                <p><strong>Accommodations:</strong> {tripForm.accommodations.length} added</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setCurrentStep(4)} className="flex-1">
                Back
              </Button>
              <Button onClick={submitTrip} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Create Trip
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EnhancedTripModal
