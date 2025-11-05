'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, X, Send, Circle } from 'lucide-react'
import { toast } from 'sonner'
import { userApi, messageApi } from '@/lib/api'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ChatPanelErrorFallback } from '@/components/ErrorFallbacks'

const ChatPanel = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Heartbeat to keep user online
  useEffect(() => {
    const heartbeat = setInterval(async () => {
      try {
        await userApi.heartbeat()
      } catch (error) {
        console.error('Heartbeat failed:', error)
      }
    }, 60000) // Every minute

    return () => clearInterval(heartbeat)
  }, [])

  // Fetch online users
  useEffect(() => {
    if (!isOpen) return

    const fetchOnlineUsers = async () => {
      try {
        const users = await userApi.getOnlineUsers()
        setOnlineUsers(users)
      } catch (error) {
        console.error('Failed to fetch online users:', error)
      }
    }

    fetchOnlineUsers()
    const interval = setInterval(fetchOnlineUsers, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [isOpen])

  // Fetch messages when user is selected
  useEffect(() => {
    if (!selectedUser) return

    const fetchMessages = async () => {
      try {
        const msgs = await messageApi.getConversation(selectedUser.id)
        setMessages(msgs)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000) // Poll every 3 seconds

    return () => clearInterval(interval)
  }, [selectedUser])

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return

    try {
      const message = await messageApi.send({
        recipientId: selectedUser.id,
        content: newMessage
      })
      setMessages(prev => [...prev, message])
      setNewMessage('')
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <ErrorBoundary fallback={ChatPanelErrorFallback}>
      <>
        {/* Chat Toggle Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
          </Button>
        </div>

        {/* Chat Panel */}
        {isOpen && (
          <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-md h-[500px] max-h-[70vh] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
            {!selectedUser ? (
              // Online Users List
              <>
                <div className="p-3 sm:p-4 border-b bg-purple-600 rounded-t-lg">
                  <h3 className="text-white font-semibold flex items-center text-sm sm:text-base">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Online Planners ({onlineUsers.length})
                  </h3>
                </div>
                <ScrollArea className="flex-1 p-3 sm:p-4">
                  {onlineUsers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No other planners online</p>
                      <p className="text-sm mt-2">Check back later!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {onlineUsers.map(user => (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className="w-full p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-colors text-left flex items-start space-x-2 sm:space-x-3"
                        >
                          <div className="relative flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <Circle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-green-500 text-green-500 absolute bottom-0 right-0" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{user.name}</p>
                            {user.bio && (
                              <p className="text-xs text-gray-500 truncate">{user.bio}</p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </>
            ) : (
              // Chat View
              <>
                <div className="p-3 sm:p-4 border-b bg-purple-600 rounded-t-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <button onClick={() => setSelectedUser(null)} className="text-white hover:text-gray-200 text-lg sm:text-xl flex-shrink-0">
                      ←
                    </button>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-semibold text-xs sm:text-sm flex-shrink-0">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold text-xs sm:text-sm truncate">{selectedUser.name}</h3>
                      <p className="text-purple-200 text-xs flex items-center">
                        <Circle className="w-2 h-2 fill-green-400 text-green-400 mr-1 flex-shrink-0" />
                        Online
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-3 sm:p-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No messages yet</p>
                      <p className="text-sm mt-2">Start the conversation!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[70%] p-2 sm:p-3 rounded-lg ${
                              msg.senderId === currentUser.id
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-xs sm:text-sm break-words">{msg.content}</p>
                            <p className={`text-xs mt-1 ${
                              msg.senderId === currentUser.id ? 'text-purple-200' : 'text-gray-500'
                            }`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 text-sm sm:text-base"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-purple-600 hover:bg-purple-700 flex-shrink-0"
                      size="sm"
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </>
    </ErrorBoundary>
  )
}

export default ChatPanel
