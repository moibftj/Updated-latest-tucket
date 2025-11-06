import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import ErrorBoundary from '@/components/ErrorBoundary'
import ClientErrorHandler from '@/components/ClientErrorHandler'

export const metadata = {
  title: 'Tucker Trips - Your Travel Planner',
  description: 'Plan, document, and share your travel adventures',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientErrorHandler />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}