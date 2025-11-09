import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import {
  getSupabase,
  verifyToken,
  unauthorizedResponse,
  successResponse,
  errorResponse,
} from '../lib/middleware'
import { messageSchema } from '../lib/schemas'

/**
 * POST /api/messages
 * Send a message to another user
 */
export async function handleSendMessage(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Validate input
    const { recipientId, content } = messageSchema.parse(body)

    const message = {
      id: uuidv4(),
      sender_id: decoded.userId,
      recipient_id: recipientId,
      content,
      read: false,
      created_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('messages').insert([message])

    if (error) throw error

    return successResponse(
      {
        id: message.id,
        senderId: message.sender_id,
        recipientId: message.recipient_id,
        content: message.content,
        read: message.read,
        createdAt: message.created_at,
      },
      request
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse('Validation failed', 400, request)
    }
    throw error
  }
}

/**
 * GET /api/messages/:userId
 * Get conversation with a specific user
 */
export async function handleGetConversation(request, otherUserId) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${decoded.userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${decoded.userId})`
    )
    .order('created_at', { ascending: true })

  // Mark messages as read
  await supabase
    .from('messages')
    .update({ read: true })
    .eq('sender_id', otherUserId)
    .eq('recipient_id', decoded.userId)
    .eq('read', false)

  // Convert snake_case to camelCase for client
  const formattedMessages = (messages || []).map((msg) => ({
    id: msg.id,
    senderId: msg.sender_id,
    recipientId: msg.recipient_id,
    content: msg.content,
    read: msg.read,
    createdAt: msg.created_at,
  }))

  return successResponse(formattedMessages, request)
}
