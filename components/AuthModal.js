'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Plane } from 'lucide-react'

const AuthModal = ({ open, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  })

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
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!')
        setAuthForm({ email: '', password: '', name: '' })
        onSuccess(data.user)
      } else {
        toast.error(data.error || 'Authentication failed')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glow-purple-pink glow-border bg-white relative">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full shadow-lg">
              <Plane className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Tucker Trips
          </DialogTitle>
        </DialogHeader>
        
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
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
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
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
