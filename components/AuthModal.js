'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Plane } from 'lucide-react'
import { authApi } from '@/lib/api'

const AuthModal = ({ open, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleAuth = async (e) => {
    e.preventDefault()

    try {
      const data = isLogin
        ? await authApi.login(authForm)
        : await authApi.register(authForm)

      localStorage.setItem('token', data.token)
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!')
      setAuthForm({ email: '', password: '', name: '' })
      onSuccess(data.user)
    } catch (error) {
      toast.error(error.message || 'Authentication failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md glow-purple-pink glow-border bg-white relative" aria-describedby="auth-description">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full shadow-lg">
              <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Tucker Trips
          </DialogTitle>
        </DialogHeader>
        <div id="auth-description" className="sr-only">Login or sign up to access Tucker Trips</div>
        
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
