# YouTube RSS Feed Setup

## Step 1: Find Your Channel ID

You need your YouTube channel ID to use the RSS feed. Here are 3 ways to get it:

### Method 1: From Your Channel Page (Easiest)
1. Go to https://www.youtube.com/@slbergeron
2. Right-click → "View Page Source"
3. Search for `"channelId"` (Ctrl+F or Cmd+F)
4. Copy the ID (looks like: `UCxxxxxxxxxxxxxxxxxxx`)

### Method 2: From YouTube Studio
1. Go to https://studio.youtube.com
2. Look at the URL - your channel ID is in the URL
3. Example: `studio.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxx`

### Method 3: Use This URL
1. Open: https://www.youtube.com/@slbergeron
2. Look at the browser tab - the page source will show the channel ID

## Step 2: Update the API Route

Once you have your channel ID, update this file:
`/Users/slbergeron/lemonbrand-website/app/api/youtube-videos/route.ts`

Replace line 6:
```typescript
const YOUTUBE_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCxQ8C8K4JqRxGxJXQ8C8K4Jq';
```

With your actual channel ID:
```typescript
const YOUTUBE_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_ACTUAL_CHANNEL_ID';
```

## Step 3: Test It

```bash
# Start your dev server
npm run dev

# Visit the API endpoint
open http://localhost:3000/api/youtube-videos

# You should see JSON with your 3 latest videos
```

## How It Works

- **No API key needed** - Uses public RSS feed
- **No quota limits** - Free forever
- **Auto-updates** - Caches for 1 hour, then fetches fresh
- **Fallback** - If RSS fails, shows your manual video list

## Benefits

✅ Free forever
✅ No API key management
✅ No quota limits
✅ Automatic updates
✅ Fast (cached for 1 hour)
✅ Shows your 3 most recent videos

## What Gets Displayed

For each video:
- Video ID (for linking)
- Title
- Thumbnail (high quality)
- Published date (formatted as "X days/weeks ago")

The component automatically formats dates like:
- "Today"
- "Yesterday"
- "3 days ago"
- "2 weeks ago"
- "1 month ago"
