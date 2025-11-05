'use client'

import { Button } from '@/components/ui/button'
import { MapPin, PlusCircle } from 'lucide-react'
import TripCard from '@/components/TripCard'
import ShinyText from '@/components/ShinyText'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import ErrorBoundary from '@/components/ErrorBoundary'
import { TripsSectionErrorFallback } from '@/components/ErrorFallbacks'

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
)

const SectionHeader = ({ title, showCreateButton, onNewTrip }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
    {showCreateButton && (
      <Button onClick={onNewTrip} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
        <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        <ShinyText text="New Trip" speed={3} />
      </Button>
    )}
  </div>
)

const EmptyState = ({ message, onNewTrip, showCreateButton }) => (
  <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-lg px-4">
    <div className="mx-auto mb-4 p-3 sm:p-4 bg-gray-100 rounded-full w-fit">
      <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
    <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
    {showCreateButton && (
      <Button onClick={onNewTrip} className="bg-purple-600 hover:bg-purple-700">
        <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        Create Your First Trip
      </Button>
    )}
  </div>
)

const TripsSection = ({ config, trips = [], isLoading = false, onNewTrip, onDelete, onTripClick }) => {
  if (!config) {
    return null
  }

  const {
    title = 'Trips',
    emptyMessage = 'You don\'t have any trips yet.',
    showCreateButton = false,
    canDelete = false,
    showUserName = false,
    pagination,
    onPageChange,
  } = config

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null

    const { page: currentPage, totalPages } = pagination
    const pages = []

    // Generate page numbers to display
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {pages.map((page, index) =>
            page === '...' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange?.(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <ErrorBoundary fallback={TripsSectionErrorFallback}>
      <div>
        <SectionHeader title={title} showCreateButton={showCreateButton} onNewTrip={onNewTrip} />
        {isLoading ? (
          <Loader />
        ) : trips.length === 0 ? (
          <EmptyState message={emptyMessage} onNewTrip={onNewTrip} showCreateButton={showCreateButton} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onClick={onTripClick}
                  onDelete={canDelete ? onDelete : undefined}
                  showUserName={showUserName}
                />
              ))}
            </div>
            {renderPagination()}
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default TripsSection
