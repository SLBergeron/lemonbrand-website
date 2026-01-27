# Video Assets for VSL

## Required Files

### 1. `vsl-preview.mp4`
- **Purpose**: Looping preview video shown in hero section
- **Specs**:
  - 5-10 seconds loop
  - MP4 format (H.264 codec)
  - 1280x720 resolution (720p is sufficient)
  - 24fps frame rate
  - Muted, autoplay-ready
  - Recommended: 500KB - 1MB file size
  - Bitrate: 500-800 kbps

### 2. `vsl-poster.jpg`
- **Purpose**: Fallback poster image for browsers without WebM support
- **Specs**:
  - 1920x1080 resolution
  - JPG format
  - Optimized for web (~200-300 KB)

## Upload Instructions

1. Export your VSL preview clip as WebM (use ffmpeg or HandBrake)
2. Create a poster frame from the video as JPG
3. Upload both files to this directory
4. Update YouTube video ID in `/components/hero.tsx` line 168

## YouTube Video Setup

Replace `YOUR_YOUTUBE_VIDEO_ID` in hero.tsx with your actual YouTube video ID.

Example: If URL is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
Then ID is: `dQw4w9WgXcQ`
