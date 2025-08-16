# Video Assets

Place your video files in this directory:

## Required Video Files:
- `Quotely-Video-1.001.mp4` - Main demo video (MP4 format)
- `Quotely-Video-1.001.webm` - WebM version for better browser compatibility (optional)

## Video Specifications:
- **Resolution**: 1920x1080 (1080p) recommended
- **Format**: MP4 (H.264 codec) for maximum compatibility
- **File Size**: Keep under 50MB for faster loading
- **Duration**: 2-3 minutes ideal for engagement

## Video Thumbnail:
Place a thumbnail image at `/public/images/video-thumbnail.jpg`
- **Resolution**: 1920x1080
- **Format**: JPG or PNG
- **File Size**: Under 500KB

## Optimization Tips:
1. Use video compression tools like HandBrake
2. Consider using a CDN for video delivery
3. Provide multiple formats (MP4, WebM) for browser compatibility
4. Use `preload="metadata"` to load video metadata only
5. Consider lazy loading for below-the-fold videos

## Testing:
After adding videos, test on:
- Chrome
- Safari
- Firefox
- Mobile devices
- Different network speeds