'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { userApi } from '@/lib/api'

const ProfileSettings = ({ open, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setFormData({
      name: user.name || '',
      bio: user.bio || ''
    })
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = await userApi.updateProfile(formData)
      onUpdate(data.user)
      toast.success('Profile updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <Label>Email</Label>
            <Input
              value={user.email}
              disabled
              className="bg-gray-100"
            />
          </div>

          {/* Biography */}
          <div>
            <Label>Biography</Label>
            <Textarea
              placeholder="Tell us about yourself... Where you love to travel, your travel style, favorite destinations, etc."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileSettings
