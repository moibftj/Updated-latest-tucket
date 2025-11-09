/**
 * useRealtimeMessages Hook
 *
 * Subscribes to real-time message updates using Supabase Realtime.
 * Replaces inefficient polling with live subscriptions.
 */

import { useEffect, useState } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export function useRealtimeMessages(currentUserId, selectedUserId) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!currentUserId || !selectedUserId) {
      setMessages([])
      setLoading(false)
      return
    }

    const supabase = createClientSupabaseClient()
    let channel = null

    const setupRealtimeSubscription = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch initial messages
        const { data: initialMessages, error: fetchError } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`)
          .or(`sender_id.eq.${selectedUserId},recipient_id.eq.${selectedUserId}`)
          .order('created_at', { ascending: true })

        if (fetchError) {
          throw fetchError
        }

        // Filter messages for this conversation only
        const conversationMessages = (initialMessages || []).filter(
          msg =>
            (msg.sender_id === currentUserId && msg.recipient_id === selectedUserId) ||
            (msg.sender_id === selectedUserId && msg.recipient_id === currentUserId)
        )

        setMessages(conversationMessages)

        // Subscribe to real-time updates
        channel = supabase
          .channel(`messages:${currentUserId}:${selectedUserId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `recipient_id=eq.${currentUserId}`,
            },
            (payload) => {
              // Only add messages from the selected user
              if (payload.new.sender_id === selectedUserId) {
                setMessages((prev) => [...prev, payload.new])
              }
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `sender_id=eq.${currentUserId}`,
            },
            (payload) => {
              // Add messages sent by current user to selected user
              if (payload.new.recipient_id === selectedUserId) {
                setMessages((prev) => [...prev, payload.new])
              }
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              logger?.info?.('Subscribed to real-time messages')
            } else if (status === 'CHANNEL_ERROR') {
              logger?.error?.('Error subscribing to real-time messages')
              setError('Failed to establish real-time connection')
            }
          })

        setLoading(false)
      } catch (err) {
        logger?.error?.('Failed to setup realtime messages:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    setupRealtimeSubscription()

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [currentUserId, selectedUserId])

  return { messages, loading, error }
}
