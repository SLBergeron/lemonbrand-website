import { NextResponse } from 'next/server';

// YouTube RSS feed for channel @slbergeron (UCcc60B0sWD51HoCsQw8o-6g)
const YOUTUBE_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcc60B0sWD51HoCsQw8o-6g';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export async function GET() {
  try {
    const response = await fetch(YOUTUBE_RSS_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch YouTube RSS feed');
    }

    const xmlText = await response.text();

    // Parse XML to extract video data
    const videos = parseYouTubeRSS(xmlText);

    // Return only the 3 most recent videos
    return NextResponse.json(videos.slice(0, 3));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);

    // Return fallback videos if RSS fails
    return NextResponse.json([
      {
        id: "nMA53BV5MLM",
        title: "Building AI Agent Businesses - The Real Story",
        thumbnail: "https://img.youtube.com/vi/nMA53BV5MLM/maxresdefault.jpg",
        publishedAt: "2 weeks ago",
      }
    ]);
  }
}

function parseYouTubeRSS(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];

  // Extract video entries using regex (simple parsing)
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  const entries = xml.match(entryRegex) || [];

  for (const entry of entries) {
    // Extract video ID
    const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const videoId = idMatch ? idMatch[1] : '';

    // Extract title
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract published date
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
    const publishedAt = publishedMatch ? formatDate(publishedMatch[1]) : '';

    if (videoId && title) {
      videos.push({
        id: videoId,
        title: title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        publishedAt: publishedAt,
      });
    }
  }

  return videos;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
