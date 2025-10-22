import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Tucker Trips - Your Travel Planner',
  description: 'Plan, document, and share your travel adventures',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}