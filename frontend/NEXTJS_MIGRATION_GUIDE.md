# Tucker Trips - Next.js Migration Guide

This React application is built with clean, portable components that can be easily migrated to Next.js.

## Component Structure

All components are located in `/src/components/` and follow Next.js-compatible patterns:

### Main Components
- `Header.jsx` - Fixed navigation header with animated logo
- `HeroSection.jsx` - Full-screen hero with gradient overlay
- `CommunitySection.jsx` - Community introduction section
- `WhoWeAreSection.jsx` - About section with images
- `FeaturesSection.jsx` - Three feature cards
- `VideoSection.jsx` - Video player with custom controls
- `FounderSection.jsx` - Founder story section
- `ContactSection.jsx` - Contact form
- `CTASection.jsx` - Call-to-action section
- `Footer.jsx` - Footer with newsletter signup

## Migration Steps to Next.js

### 1. Install Dependencies
```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-toast @radix-ui/react-label
```

### 2. Update Imports
Replace:
```javascript
import { Button } from './ui/button'
```
With:
```javascript
import { Button } from '@/components/ui/button'
```

### 3. Image Optimization
Replace `<img>` tags with Next.js `<Image>`:
```javascript
import Image from 'next/image'

// Replace
<img src="..." alt="..." className="..." />

// With
<Image src="..." alt="..." width={800} height={600} className="..." />
```

### 4. Video Assets
Both video files are hosted on CDN:
- Logo Animation: `https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/d3iha7rk_withoutline.webm`
- Main Video: `https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/9o1y7nx5_tucker-trips_compressed.webm`

For better performance in Next.js, consider:
1. Downloading these files to `/public/videos/`
2. Using Next.js's built-in video optimization

### 5. Routing
Replace `react-router-dom` with Next.js App Router:
```javascript
// Current: BrowserRouter with Routes
// Next.js: Use app/ directory structure with page.tsx files
```

### 6. CSS/Styling
The application uses:
- **Tailwind CSS** (already Next.js compatible)
- **Custom animations** in `App.css`
- **Shadcn UI components** in `/components/ui/`

Simply copy `App.css` content to your Next.js `globals.css`.

### 7. State Management
All state is local (useState, useRef) - no changes needed.

### 8. Environment Variables
Currently using:
```
REACT_APP_BACKEND_URL
```

In Next.js, rename to:
```
NEXT_PUBLIC_BACKEND_URL
```

## Image URLs Used

All images are from Unsplash/Pexels with proper URLs. See component files for complete list.

## Design System

### Colors
- Primary Teal: `#4DB8BA`
- Pink/Magenta: `#ec4899`
- Navy: `#3a4d6f`
- Dark Navy: `#2a3a5a`

### Fonts
Using system fonts. For custom fonts in Next.js:
```javascript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```

## Component Features

### Header
- Fixed positioning
- Scroll behavior (changes background on scroll)
- Animated logo video
- Responsive navigation

### Hero Section
- Full viewport height
- Gradient overlay
- Smooth scroll functionality
- Text stroke effect on main heading

### Video Section
- Custom video controls
- Play/Pause functionality
- Mute/Unmute toggle
- Hover overlay effects

### Forms
- Contact form with validation
- Newsletter signup
- Toast notifications (using shadcn/ui)

## Performance Optimizations for Next.js

1. **Use Next.js Image component** for all images
2. **Lazy load** video sections
3. **Code split** components with dynamic imports
4. **Preload** critical assets (fonts, hero images)
5. **Use next/head** for meta tags and SEO

## Testing in Next.js

Run standard Next.js development server:
```bash
npm run dev
```

Build and test production:
```bash
npm run build
npm start
```

## Notes

- All components are functional components using React hooks
- No Redux or complex state management
- Fully responsive design
- Accessibility features included (aria-labels, semantic HTML)
- Form validation included
- Toast notifications for user feedback
