'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Plane, Hotel, Car, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { tripApi } from '@/lib/api'

const NewTripModal = ({ open, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [tripForm, setTripForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    status: 'future',
    visibility: 'private',
    segments: []
  })

  const [flightForm, setFlightForm] = useState({ airline: '', flightNumber: '', departureTime: '', arrivalTime: '', price: '' })
  const [accommodationForm, setAccommodationForm] = useState({ name: '', checkIn: '', checkOut: '', price: '' })
  const [hotelForm, setHotelForm] = useState({ name: '', checkIn: '', checkOut: '', address: '', price: '' })
  const [transportForm, setTransportForm] = useState({ type: '', details: '', date: '', price: '' })

  const addSegment = (type, data) => {
    const segment = { id: Date.now(), type, ...data }
    setTripForm(prev => ({
      ...prev,
      segments: [...prev.segments, segment]
    }))
    
    if (type === 'flight') setFlightForm({ airline: '', flightNumber: '', departureTime: '', arrivalTime: '', price: '' })
    if (type === 'accommodation') setAccommodationForm({ name: '', checkIn: '', checkOut: '', price: '' })
    if (type === 'hotel') setHotelForm({ name: '', checkIn: '', checkOut: '', address: '', price: '' })
    if (type === 'transport') setTransportForm({ type: '', details: '', date: '', price: '' })
    
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added!`)
  }

  const removeSegment = (segmentId) => {
    setTripForm(prev => ({
      ...prev,
      segments: prev.segments.filter(s => s.id !== segmentId)
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
      setTripForm({ title: '', destination: '', startDate: '', endDate: '', status: 'future', visibility: 'private', segments: [] })
    } catch (error) {
      toast.error('Failed to create trip')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>Step {currentStep} of 5</DialogDescription>
        </DialogHeader>

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Trip Title *</Label>
              <Input
                placeholder="Japan Spring Adventure"
                value={tripForm.title}
                onChange={(e) => setTripForm({ ...tripForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Destination *</Label>
              <Input
                placeholder="Tokyo, Japan"
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

            <Button onClick={() => setCurrentStep(2)} className="w-full bg-purple-600 hover:bg-purple-700">Next: Flight Details</Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Plane className="w-5 h-5 mr-2 text-blue-500" />
              Flight Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Airline</Label>
                <Input placeholder="Delta Airlines" value={flightForm.airline} onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })} />
              </div>
              <div>
                <Label>Flight Number</Label>
                <Input placeholder="DL123" value={flightForm.flightNumber} onChange={(e) => setFlightForm({ ...flightForm, flightNumber: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Departure Time</Label>
                <Input type="datetime-local" value={flightForm.departureTime} onChange={(e) => setFlightForm({ ...flightForm, departureTime: e.target.value })} />
              </div>
              <div>
                <Label>Arrival Time</Label>
                <Input type="datetime-local" value={flightForm.arrivalTime} onChange={(e) => setFlightForm({ ...flightForm, arrivalTime: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" placeholder="500" value={flightForm.price} onChange={(e) => setFlightForm({ ...flightForm, price: e.target.value })} />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => addSegment('flight', flightForm)} disabled={!flightForm.airline || !flightForm.flightNumber}>
                Add Flight
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button onClick={() => setCurrentStep(3)} className="ml-auto bg-purple-600 hover:bg-purple-700">Next: Accommodations</Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Hotel className="w-5 h-5 mr-2 text-green-500" />
              Accommodations
            </h3>
            <div>
              <Label>Property Name</Label>
              <Input placeholder="Airbnb in Shibuya" value={accommodationForm.name} onChange={(e) => setAccommodationForm({ ...accommodationForm, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Check-in</Label>
                <Input type="date" value={accommodationForm.checkIn} onChange={(e) => setAccommodationForm({ ...accommodationForm, checkIn: e.target.value })} />
              </div>
              <div>
                <Label>Check-out</Label>
                <Input type="date" value={accommodationForm.checkOut} onChange={(e) => setAccommodationForm({ ...accommodationForm, checkOut: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" placeholder="150" value={accommodationForm.price} onChange={(e) => setAccommodationForm({ ...accommodationForm, price: e.target.value })} />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => addSegment('accommodation', accommodationForm)} disabled={!accommodationForm.name}>
                Add Accommodation
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(2)}>Back</Button>
              <Button onClick={() => setCurrentStep(4)} className="ml-auto bg-purple-600 hover:bg-purple-700">Next: Hotels</Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Hotel className="w-5 h-5 mr-2 text-green-500" />
              Hotels
            </h3>
            <div>
              <Label>Hotel Name</Label>
              <Input placeholder="Park Hyatt Tokyo" value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} />
            </div>
            <div>
              <Label>Address</Label>
              <Input placeholder="3-7-1-2 Nishishinjuku, Shinjuku-ku" value={hotelForm.address} onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Check-in</Label>
                <Input type="date" value={hotelForm.checkIn} onChange={(e) => setHotelForm({ ...hotelForm, checkIn: e.target.value })} />
              </div>
              <div>
                <Label>Check-out</Label>
                <Input type="date" value={hotelForm.checkOut} onChange={(e) => setHotelForm({ ...hotelForm, checkOut: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" placeholder="300" value={hotelForm.price} onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })} />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => addSegment('hotel', hotelForm)} disabled={!hotelForm.name}>
                Add Hotel
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(3)}>Back</Button>
              <Button onClick={() => setCurrentStep(5)} className="ml-auto bg-purple-600 hover:bg-purple-700">Next: Transportation</Button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Car className="w-5 h-5 mr-2 text-purple-500" />
              Transportation
            </h3>
            <div>
              <Label>Type</Label>
              <Input placeholder="Rental Car / Train / Taxi" value={transportForm.type} onChange={(e) => setTransportForm({ ...transportForm, type: e.target.value })} />
            </div>
            <div>
              <Label>Details</Label>
              <Input placeholder="Toyota Camry from Hertz" value={transportForm.details} onChange={(e) => setTransportForm({ ...transportForm, details: e.target.value })} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={transportForm.date} onChange={(e) => setTransportForm({ ...transportForm, date: e.target.value })} />
            </div>
            <div>
              <Label>Price</Label>
              <Input type="number" placeholder="50" value={transportForm.price} onChange={(e) => setTransportForm({ ...transportForm, price: e.target.value })} />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => addSegment('transport', transportForm)} disabled={!transportForm.type}>
                Add Transportation
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(4)}>Back</Button>
            </div>

            <div className="border-t pt-4 mt-6">
              <h4 className="font-semibold mb-3">Review Your Trip</h4>
              <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Title:</strong> {tripForm.title}</p>
                <p><strong>Destination:</strong> {tripForm.destination}</p>
                <p><strong>Dates:</strong> {tripForm.startDate} to {tripForm.endDate || tripForm.startDate}</p>
                <p><strong>Status:</strong> {tripForm.status === 'future' ? 'Future Trip' : 'Trip Taken'}</p>
                <p><strong>Visibility:</strong> {tripForm.visibility === 'public' ? 'Public' : 'Private'}</p>
                <p><strong>Segments:</strong> {tripForm.segments.length} items added</p>
              </div>
              {tripForm.segments.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
                  {tripForm.segments.map(segment => (
                    <div key={segment.id} className="flex items-center justify-between bg-white border p-2 rounded text-sm">
                      <span>
                        {segment.type === 'flight' && `✈️ ${segment.airline} ${segment.flightNumber}`}
                        {segment.type === 'hotel' && `🏨 ${segment.name}`}
                        {segment.type === 'accommodation' && `🏠 ${segment.name}`}
                        {segment.type === 'transport' && `🚗 ${segment.type} - ${segment.details}`}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => removeSegment(segment.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button onClick={submitTrip} className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                Create Trip
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default NewTripModal
