'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Mail,
  Share2,
  Users,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
// EmailService is only used on the server side

const ShareTripModal = ({ trip, isOpen, onClose, currentUser, onShareSuccess }) => {
  const [email, setEmail] = useState('')
  const [isSharing, setIsSharing] = useState(false)
  const [shareStatus, setShareStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => {
    setEmail('')
    setShareStatus(null)
    setErrorMessage('')
    setIsSharing(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleShare = async () => {
    if (!email.trim()) {
      setShareStatus('error')
      setErrorMessage('Please enter an email address')
      return
    }

    if (!validateEmail(email.trim())) {
      setShareStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setIsSharing(true)
    setShareStatus(null)
    setErrorMessage('')

    try {
      const response = await fetch(`/api/trips/${trip.id}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          recipientEmail: email.trim().toLowerCase()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to share trip')
      }

      setShareStatus('success')
      setEmail('')

      // Notify parent component of successful share
      if (onShareSuccess) {
        onShareSuccess(data.sharedTrip)
      }

      // Auto close after success
      setTimeout(() => {
        handleClose()
      }, 2000)

    } catch (error) {
      console.error('Error sharing trip:', error)
      setShareStatus('error')
      setErrorMessage(error.message || 'Failed to share trip. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSharing) {
      handleShare()
    }
  }

  if (!trip) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Share2 className="w-5 h-5 text-[#ff34ac]" />
            Share Trip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Trip Info */}
          <div className="p-3 bg-gradient-to-r from-[#ff34ac20] to-[#7dbbe520] rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">{trip.title}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {trip.destination || trip.location}
            </p>
          </div>

          <Separator />

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Share with (email address)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
                disabled={isSharing}
              />
            </div>
            <p className="text-xs text-gray-500">
              They'll receive an email with access to this trip
            </p>
          </div>

          {/* Status Messages */}
          {shareStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">
                Trip shared successfully!
              </span>
            </div>
          )}

          {shareStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">
                {errorMessage}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSharing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              disabled={isSharing || !email.trim()}
              className="flex-1 bg-gradient-to-r from-[#ff34ac] to-[#7dbbe5] hover:from-[#ff34ac90] hover:to-[#7dbbe590]"
            >
              {isSharing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Trip
                </>
              )}
            </Button>
          </div>

          {/* Info Section */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• If they're not a Tucker Trips user, they'll receive an invitation to join</p>
            <p>• They'll get full access to all trip details and photos</p>
            <p>• You can share this trip with multiple people</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareTripModal