'use client'

import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading skeleton for trips section
 * Provides a smooth loading experience while fetching data
 */
export function TripsLoadingSkeleton({ count = 6 }) {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Trip cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <TripCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-8">
        <Skeleton className="h-10 w-64" />
      </div>
    </div>
  )
}

/**
 * Loading skeleton for a single trip card
 */
export function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full" />
      
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Date skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        {/* Location skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-40" />
        </div>
        
        {/* User info skeleton (for shared/public trips) */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  )
}

/**
 * Compact loading skeleton for inline loading states
 */
export function CompactLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}

/**
 * Full page loading skeleton
 */
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64 mb-8" />
        <TripsLoadingSkeleton count={9} />
      </div>
    </div>
  )
}
