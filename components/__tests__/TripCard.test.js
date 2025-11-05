import { render, screen, fireEvent } from '@testing-library/react'
import TripCard from '../TripCard'

describe('TripCard', () => {
  const mockTrip = {
    id: '1',
    title: 'Summer Vacation',
    destination: 'Paris, France',
    startDate: '2024-07-01',
    endDate: '2024-07-10',
    visibility: 'public',
    description: 'A wonderful trip to Paris',
    status: 'future',
    segments: [
      {
        id: 's1',
        type: 'flight',
        airline: 'Air France',
        flightNumber: 'AF123',
        price: 500,
      },
      {
        id: 's2',
        type: 'hotel',
        name: 'Hotel Paris',
        price: 150,
      },
    ],
  }

  const mockOnClick = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders trip information correctly', () => {
    render(<TripCard trip={mockTrip} />)

    expect(screen.getByText('Summer Vacation')).toBeInTheDocument()
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
    expect(screen.getByText('A wonderful trip to Paris')).toBeInTheDocument()
  })

  it('displays formatted dates', () => {
    render(<TripCard trip={mockTrip} />)

    const startDate = new Date('2024-07-01').toLocaleDateString()
    const endDate = new Date('2024-07-10').toLocaleDateString()

    expect(screen.getByText(`${startDate} - ${endDate}`)).toBeInTheDocument()
  })

  it('shows visibility status correctly', () => {
    render(<TripCard trip={mockTrip} />)

    expect(screen.getByText('public')).toBeInTheDocument()
  })

  it('displays private visibility when trip is private', () => {
    const privateTrip = { ...mockTrip, visibility: 'private' }
    render(<TripCard trip={privateTrip} />)

    expect(screen.getByText('private')).toBeInTheDocument()
  })

  it('shows trip status correctly', () => {
    render(<TripCard trip={mockTrip} />)

    expect(screen.getByText('📅 Future Trip')).toBeInTheDocument()
  })

  it('shows completed trip status', () => {
    const completedTrip = { ...mockTrip, status: 'completed' }
    render(<TripCard trip={completedTrip} />)

    expect(screen.getByText('✓ Trip Taken')).toBeInTheDocument()
  })

  it('displays itinerary segments', () => {
    render(<TripCard trip={mockTrip} />)

    expect(screen.getByText('Itinerary (2 items):')).toBeInTheDocument()
    expect(screen.getByText('Air France AF123')).toBeInTheDocument()
    expect(screen.getByText('Hotel Paris')).toBeInTheDocument()
    expect(screen.getByText('$500')).toBeInTheDocument()
    expect(screen.getByText('$150')).toBeInTheDocument()
  })

  it('shows message when no segments exist', () => {
    const tripWithoutSegments = { ...mockTrip, segments: [] }
    render(<TripCard trip={tripWithoutSegments} />)

    expect(screen.getByText('No itinerary items yet')).toBeInTheDocument()
  })

  it('limits displayed segments to 3 and shows count', () => {
    const tripWithManySegments = {
      ...mockTrip,
      segments: [
        { id: 's1', type: 'flight', airline: 'Air France', flightNumber: 'AF123' },
        { id: 's2', type: 'hotel', name: 'Hotel Paris' },
        { id: 's3', type: 'transport', type: 'transport', details: 'Car rental' },
        { id: 's4', type: 'flight', airline: 'Air France', flightNumber: 'AF456' },
        { id: 's5', type: 'hotel', name: 'Hotel Nice' },
      ],
    }

    render(<TripCard trip={tripWithManySegments} />)

    expect(screen.getByText('Itinerary (5 items):')).toBeInTheDocument()
    expect(screen.getByText('+ 2 more items')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    render(<TripCard trip={mockTrip} onClick={mockOnClick} />)

    const card = screen.getByText('Summer Vacation').closest('.group')
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(mockTrip)
  })

  it('renders delete button when onDelete prop is provided', () => {
    render(<TripCard trip={mockTrip} onDelete={mockOnDelete} />)

    const deleteButton = screen.getByRole('button')
    expect(deleteButton).toBeInTheDocument()
  })

  it('does not render delete button when onDelete prop is not provided', () => {
    render(<TripCard trip={mockTrip} />)

    const buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<TripCard trip={mockTrip} onDelete={mockOnDelete} onClick={mockOnClick} />)

    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('stops event propagation when delete button is clicked', () => {
    render(<TripCard trip={mockTrip} onDelete={mockOnDelete} onClick={mockOnClick} />)

    const deleteButton = screen.getByRole('button')
    fireEvent.click(deleteButton)

    // onClick should not be called when delete is clicked
    expect(mockOnClick).not.toHaveBeenCalled()
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('displays user name when showUserName is true', () => {
    const tripWithUser = { ...mockTrip, userName: 'John Doe' }
    render(<TripCard trip={tripWithUser} showUserName={true} />)

    expect(screen.getByText('by John Doe')).toBeInTheDocument()
  })

  it('does not display user name when showUserName is false', () => {
    const tripWithUser = { ...mockTrip, userName: 'John Doe' }
    render(<TripCard trip={tripWithUser} showUserName={false} />)

    expect(screen.queryByText('by John Doe')).not.toBeInTheDocument()
  })

  it('does not display user name when userName is not provided', () => {
    render(<TripCard trip={mockTrip} showUserName={true} />)

    expect(screen.queryByText(/by /)).not.toBeInTheDocument()
  })

  it('renders without description when not provided', () => {
    const tripWithoutDescription = { ...mockTrip, description: null }
    render(<TripCard trip={tripWithoutDescription} />)

    expect(screen.queryByText('A wonderful trip to Paris')).not.toBeInTheDocument()
  })

  it('displays different segment types correctly', () => {
    const tripWithVariousSegments = {
      ...mockTrip,
      segments: [
        { id: 's1', type: 'flight', airline: 'Air France', flightNumber: 'AF123' },
        { id: 's2', type: 'accommodation', name: 'Airbnb Paris' },
        { id: 's3', type: 'transport', type: 'transport', details: 'Taxi' },
      ],
    }

    render(<TripCard trip={tripWithVariousSegments} />)

    expect(screen.getByText('Air France AF123')).toBeInTheDocument()
    expect(screen.getByText('Airbnb Paris')).toBeInTheDocument()
    expect(screen.getByText('transport - Taxi')).toBeInTheDocument()
  })
})
