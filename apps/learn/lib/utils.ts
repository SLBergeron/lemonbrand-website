import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get YouTube embed URL from various YouTube URL formats
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Already an embed URL
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  // Extract video ID from various formats
  let videoId: string | null = null;

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
}

// Format duration in minutes to human readable
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Get day status label
export function getDayStatusLabel(
  status: "locked" | "available" | "in_progress" | "completed"
): string {
  switch (status) {
    case "locked":
      return "Locked";
    case "available":
      return "Start";
    case "in_progress":
      return "Continue";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}
