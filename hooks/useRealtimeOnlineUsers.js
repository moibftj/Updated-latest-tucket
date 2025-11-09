/**
 * useRealtimeOnlineUsers Hook
 *
 * Subscribes to real-time user online status updates using Supabase Realtime.
 * Replaces inefficient polling with live subscriptions.
 */

import { useEffect, useState } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export function useRealtimeOnlineUsers(currentUserId) {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentUserId) {
      setOnlineUsers([])
      setLoading(false)
      return
    }

    const supabase = createClientSupabaseClient()
    let channel = null

    const setupRealtimeSubscription = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch initial online users
        // Users are considered online if they've been active in the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

        const { data: users, error: fetchError } = await supabase
          .from('users')
          .select('id, email, name, bio, last_seen, is_online')
          .neq('id', currentUserId)
          .gte('last_seen', fiveMinutesAgo)
          .order('last_seen', { ascending: false })

        if (fetchError) {
          throw fetchError
        }

        setOnlineUsers(users || [])

        // Subscribe to real-time updates
        channel = supabase
          .channel('online-users')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'users',
            },
            (payload) => {
              // Ignore updates for current user
              if (payload.new.id === currentUserId) return

              const updatedUser = payload.new
              const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
              const lastSeenTime = new Date(updatedUser.last_seen).getTime()

              // Update user in list if they're still online
              if (lastSeenTime >= fiveMinutesAgo) {
                setOnlineUsers((prev) => {
                  const exists = prev.find((u) => u.id === updatedUser.id)
                  if (exists) {
                    // Update existing user
                    return prev.map((u) =>
                      u.id === updatedUser.id ? updatedUser : u
                    )
                  } else {
                    // Add new online user
                    return [...prev, updatedUser]
                  }
                })
              } else {
                // Remove user if they've gone offline
                setOnlineUsers((prev) =>
                  prev.filter((u) => u.id !== updatedUser.id)
                )
              }
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              logger?.info?.('Subscribed to online users updates')
            } else if (status === 'CHANNEL_ERROR') {
              logger?.error?.('Error subscribing to online users')
              setError('Failed to establish real-time connection')
            }
          })

        setLoading(false)

        // Periodic cleanup of offline users (every 30 seconds)
        const cleanupInterval = setInterval(() => {
          const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
          setOnlineUsers((prev) =>
            prev.filter((user) => {
              const lastSeenTime = new Date(user.last_seen).getTime()
              return lastSeenTime >= fiveMinutesAgo
            })
          )
        }, 30000)

        return () => clearInterval(cleanupInterval)
      } catch (err) {
        logger?.error?.('Failed to setup realtime online users:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    const cleanup = setupRealtimeSubscription()

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
      cleanup?.then((fn) => fn?.())
    }
  }, [currentUserId])

  return { onlineUsers, loading, error }
}
