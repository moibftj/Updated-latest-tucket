'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle, Plane, Hotel, Car, MapPin, Calendar, DollarSign, LogOut, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

const App = () => {
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showTripModal, setShowTripModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(true)
  
  // Auth form state
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  })

  // Trip creation state
  const [currentStep, setCurrentStep] = useState(1)
  const [tripForm, setTripForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    segments: []
  })

  // Segment forms
  const [flightForm, setFlightForm] = useState({ airline: '', flightNumber: '', departureTime: '', arrivalTime: '', price: '' })
  const [accommodationForm, setAccommodationForm] = useState({ name: '', checkIn: '', checkOut: '', price: '' })
  const [hotelForm, setHotelForm] = useState({ name: '', checkIn: '', checkOut: '', address: '', price: '' })
  const [transportForm, setTransportForm] = useState({ type: '', details: '', date: '', price: '' })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          fetchTrips(token)
        } else {
          localStorage.removeItem('token')
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  const fetchTrips = async (token) => {
    try {
      const response = await fetch('/api/trips', {
        headers: { 'Authorization': `Bearer ${token || localStorage.getItem('token')}` }
      })
      if (response.ok) {
        const data = await response.json()
        setTrips(data)
      }
    } catch (error) {
      console.error('Failed to fetch trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      })

      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        setShowAuthModal(false)
        setAuthForm({ email: '', password: '', name: '' })
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!')
        fetchTrips(data.token)
      } else {
        toast.error(data.error || 'Authentication failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setTrips([])
    toast.success('Logged out successfully')
  }

  const addSegment = (type, data) => {
    const segment = { id: Date.now(), type, ...data }
    setTripForm(prev => ({
      ...prev,
      segments: [...prev.segments, segment]
    }))
    
    // Reset form
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
    toast.success('Segment removed')
  }

  const submitTrip = async () => {
    if (!tripForm.title || !tripForm.destination || !tripForm.startDate) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tripForm)
      })

      if (response.ok) {
        const newTrip = await response.json()
        setTrips(prev => [newTrip, ...prev])
        setShowTripModal(false)
        setCurrentStep(1)
        setTripForm({ title: '', destination: '', startDate: '', endDate: '', segments: [] })
        toast.success('Trip created successfully!')
      } else {
        toast.error('Failed to create trip')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const deleteTrip = async (tripId) => {
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.ok) {
        setTrips(prev => prev.filter(t => t.id !== tripId))
        toast.success('Trip deleted')
      }
    } catch (error) {
      toast.error('Failed to delete trip')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-indigo-100 rounded-full w-fit">
              <Plane className="w-8 h-8 text-indigo-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Tucker Trips</CardTitle>
            <CardDescription className="text-base">Your personal travel planner & journal</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleAuth} className="space-y-4 mt-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleAuth} className="space-y-4 mt-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Plane className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tucker Trips</h1>
                <p className="text-sm text-gray-500">Welcome, {user.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">My Trips</h2>
          <Button onClick={() => setShowTripModal(true)} size="lg">
            <PlusCircle className="w-5 h-5 mr-2" />
            New Trip
          </Button>
        </div>

        {/* Trips Grid */}
        {trips.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full w-fit">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
            <Button onClick={() => setShowTripModal(true)}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map(trip => (
              <Card key={trip.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{trip.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {trip.destination}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTrip(trip.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                  
                  {trip.segments && trip.segments.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Itinerary:</p>
                      {trip.segments.map(segment => (
                        <div key={segment.id} className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {segment.type === 'flight' && <Plane className="w-4 h-4 mr-2 text-blue-500" />}
                          {segment.type === 'hotel' && <Hotel className="w-4 h-4 mr-2 text-green-500" />}
                          {segment.type === 'accommodation' && <Hotel className="w-4 h-4 mr-2 text-green-500" />}
                          {segment.type === 'transport' && <Car className="w-4 h-4 mr-2 text-purple-500" />}
                          <span className="flex-1">
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
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No itinerary items yet</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Trip Creation Modal */}
      <Dialog open={showTripModal} onOpenChange={setShowTripModal}>
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
              <Button onClick={() => setCurrentStep(2)} className="w-full">Next: Flight Details</Button>
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
                  <Input
                    placeholder="Delta Airlines"
                    value={flightForm.airline}
                    onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Flight Number</Label>
                  <Input
                    placeholder="DL123"
                    value={flightForm.flightNumber}
                    onChange={(e) => setFlightForm({ ...flightForm, flightNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Departure Time</Label>
                  <Input
                    type="datetime-local"
                    value={flightForm.departureTime}
                    onChange={(e) => setFlightForm({ ...flightForm, departureTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Arrival Time</Label>
                  <Input
                    type="datetime-local"
                    value={flightForm.arrivalTime}
                    onChange={(e) => setFlightForm({ ...flightForm, arrivalTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={flightForm.price}
                  onChange={(e) => setFlightForm({ ...flightForm, price: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => addSegment('flight', flightForm)}
                  disabled={!flightForm.airline || !flightForm.flightNumber}
                >
                  Add Flight
                </Button>
                <Button variant="secondary" onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={() => setCurrentStep(3)} className="ml-auto">Next: Accommodations</Button>
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
                <Input
                  placeholder="Airbnb in Shibuya"
                  value={accommodationForm.name}
                  onChange={(e) => setAccommodationForm({ ...accommodationForm, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Check-in</Label>
                  <Input
                    type="date"
                    value={accommodationForm.checkIn}
                    onChange={(e) => setAccommodationForm({ ...accommodationForm, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Check-out</Label>
                  <Input
                    type="date"
                    value={accommodationForm.checkOut}
                    onChange={(e) => setAccommodationForm({ ...accommodationForm, checkOut: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="150"
                  value={accommodationForm.price}
                  onChange={(e) => setAccommodationForm({ ...accommodationForm, price: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => addSegment('accommodation', accommodationForm)}
                  disabled={!accommodationForm.name}
                >
                  Add Accommodation
                </Button>
                <Button variant="secondary" onClick={() => setCurrentStep(2)}>Back</Button>
                <Button onClick={() => setCurrentStep(4)} className="ml-auto">Next: Hotels</Button>
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
                <Input
                  placeholder="Park Hyatt Tokyo"
                  value={hotelForm.name}
                  onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  placeholder="3-7-1-2 Nishishinjuku, Shinjuku-ku"
                  value={hotelForm.address}
                  onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Check-in</Label>
                  <Input
                    type="date"
                    value={hotelForm.checkIn}
                    onChange={(e) => setHotelForm({ ...hotelForm, checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Check-out</Label>
                  <Input
                    type="date"
                    value={hotelForm.checkOut}
                    onChange={(e) => setHotelForm({ ...hotelForm, checkOut: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="300"
                  value={hotelForm.price}
                  onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => addSegment('hotel', hotelForm)}
                  disabled={!hotelForm.name}
                >
                  Add Hotel
                </Button>
                <Button variant="secondary" onClick={() => setCurrentStep(3)}>Back</Button>
                <Button onClick={() => setCurrentStep(5)} className="ml-auto">Next: Transportation</Button>
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
                <Input
                  placeholder="Rental Car / Train / Taxi"
                  value={transportForm.type}
                  onChange={(e) => setTransportForm({ ...transportForm, type: e.target.value })}
                />
              </div>
              <div>
                <Label>Details</Label>
                <Input
                  placeholder="Toyota Camry from Hertz"
                  value={transportForm.details}
                  onChange={(e) => setTransportForm({ ...transportForm, details: e.target.value })}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={transportForm.date}
                  onChange={(e) => setTransportForm({ ...transportForm, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={transportForm.price}
                  onChange={(e) => setTransportForm({ ...transportForm, price: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => addSegment('transport', transportForm)}
                  disabled={!transportForm.type}
                >
                  Add Transportation
                </Button>
                <Button variant="secondary" onClick={() => setCurrentStep(4)}>Back</Button>
              </div>

              <div className="border-t pt-4 mt-6">
                <h4 className="font-semibold mb-3">Review Your Trip</h4>
                <div className="space-y-2 mb-4">
                  <p><strong>Title:</strong> {tripForm.title}</p>
                  <p><strong>Destination:</strong> {tripForm.destination}</p>
                  <p><strong>Dates:</strong> {tripForm.startDate} to {tripForm.endDate || tripForm.startDate}</p>
                  <p><strong>Segments:</strong> {tripForm.segments.length} items added</p>
                </div>
                {tripForm.segments.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {tripForm.segments.map(segment => (
                      <div key={segment.id} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                        <span>
                          {segment.type === 'flight' && `✈️ ${segment.airline} ${segment.flightNumber}`}
                          {segment.type === 'hotel' && `🏨 ${segment.name}`}
                          {segment.type === 'accommodation' && `🏠 ${segment.name}`}
                          {segment.type === 'transport' && `🚗 ${segment.type} - ${segment.details}`}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSegment(segment.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Button onClick={submitTrip} className="w-full mt-4" size="lg">
                  Create Trip
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
