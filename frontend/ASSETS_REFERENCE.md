# Tucker Trips - Assets Reference

Complete list of all images and video assets used in the Tucker Trips website.

## Video Assets

### 1. Logo Animation
- **File**: `withoutline.webm`
- **URL**: `https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/d3iha7rk_withoutline.webm`
- **Size**: 0.25 MB
- **Usage**: Animated spinning globe logo in header and footer
- **Components**: `Header.jsx`, `Footer.jsx`

### 2. Main Video
- **File**: `tucker-trips_compressed.webm`
- **URL**: `https://customer-assets.emergentagent.com/job_43a6966a-d890-4dd3-91aa-8c7f1d773745/artifacts/9o1y7nx5_tucker-trips_compressed.webm`
- **Size**: 5.50 MB
- **Usage**: Main video in "The Transformative Power of Travel" section
- **Component**: `VideoSection.jsx`

## Image Assets

### Hero Section
```javascript
{
  url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
  description: "Mountain hiker with backpack - adventure travel",
  component: "HeroSection.jsx",
  section: "Hero background"
}
```

### Community Section
```javascript
{
  url: "https://images.unsplash.com/photo-1756142007155-c8b4eb0c3808",
  description: "Car trunk community moment - family travel",
  component: "CommunitySection.jsx",
  section: "Community image"
}
```

### Who We Are Section
```javascript
// Image 1
{
  url: "https://images.unsplash.com/photo-1542359649-31e03cd4d909",
  description: "Person on mountain peak - achievement",
  component: "WhoWeAreSection.jsx",
  section: "Right side image"
}

// Image 2
{
  url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  description: "Boats on turquoise lake - stunning destination",
  component: "WhoWeAreSection.jsx",
  section: "Full-width destination image"
}
```

### Video Section - Gallery Images
```javascript
// Image 1
{
  url: "https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg",
  description: "Mountain lake adventure - outdoor exploration",
  component: "VideoSection.jsx",
  section: "Gallery image left"
}

// Image 2
{
  url: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg",
  description: "Urban traveler with backpack - city exploration",
  component: "VideoSection.jsx",
  section: "Gallery image right"
}
```

### Founder Section
```javascript
// Image 1
{
  url: "https://images.unsplash.com/photo-1509762774605-f07235a08f1f",
  description: "Hiking backpack at sunset - travel gear context",
  component: "FounderSection.jsx",
  section: "Left grid image"
}

// Image 2
{
  url: "https://images.pexels.com/photos/842947/pexels-photo-842947.jpeg",
  description: "Red hiking backpack - outdoor gear",
  component: "FounderSection.jsx",
  section: "Right grid image"
}
```

## Additional Images Available (Not Currently Used)

These images were curated but can be swapped in for variation:

### Travel Images
```javascript
[
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552", // Airplane wing at sunset
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1", // Wooden boat on mountain lake
  "https://images.pexels.com/photos/2245436/pexels-photo-2245436.png", // Desert adventure
  "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg" // Globe concept
]
```

### Adventure Images
```javascript
[
  "https://images.unsplash.com/photo-1528543606781-2f6e6857f318", // Suspension bridge runner
  "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg", // Mountain road journey
  "https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg" // Adventure backpack setup
]
```

## Image Specifications

### Recommended Sizes for Optimization

| Section | Recommended Width | Aspect Ratio | Format |
|---------|------------------|--------------|--------|
| Hero Background | 1920px | 16:9 | WebP/JPG |
| Community Image | 800px | 4:3 | WebP/JPG |
| Destination Images | 1200px | 16:9 | WebP/JPG |
| Gallery Images | 600px | 4:3 | WebP/JPG |
| Founder Images | 500px | 1:1 | WebP/JPG |

## Replacing Images

To replace any image:

1. **Find the component** from the table above
2. **Locate the image tag** with the current URL
3. **Replace the URL** with your new image
4. **Maintain aspect ratios** for best visual results
5. **Use WebP format** for better performance

Example:
```javascript
// Before
<img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b" alt="..." />

// After
<img src="/images/your-custom-hero.webp" alt="..." />
```

## Image Attribution

All images are from:
- **Unsplash**: Free to use under Unsplash License
- **Pexels**: Free to use under Pexels License

No attribution required, but recommended for courtesy.

## Local Asset Setup (Optional)

To use local assets instead of CDN:

1. Create `/public/images/` directory
2. Download images from URLs
3. Convert to WebP format (recommended)
4. Update image paths in components:
   ```javascript
   // From
   src="https://images.unsplash.com/..."
   
   // To
   src="/images/hero-background.webp"
   ```

5. For videos, create `/public/videos/`:
   ```javascript
   // From
   src="https://customer-assets.emergentagent.com/..."
   
   // To
   src="/videos/logo-animation.webm"
   ```

## Performance Tips

1. **Compress images** before uploading (use TinyPNG, Squoosh, etc.)
2. **Use WebP format** for modern browsers with JPG fallback
3. **Implement lazy loading** for images below the fold
4. **Use srcset** for responsive images
5. **Preload critical images** (hero background)

## Color Palette Extracted from Images

- **Teal/Turquoise**: #4DB8BA (ocean, nature)
- **Mountain Blues**: #6366f1 (sky, adventure)
- **Earthy Browns**: #8B4513 (travel gear, nature)
- **Vibrant Pink**: #ec4899 (accents, CTAs)

These colors complement the curated images perfectly.
