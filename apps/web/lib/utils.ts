import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate next cohort date (next month, or month after if past the 20th)
export function getNextCohortDate(): string {
  const now = new Date();
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  // Start with next month
  let targetMonth = now.getMonth() + 1;
  let targetYear = now.getFullYear();

  // If we're past the 20th, skip to month after next
  if (now.getDate() > 20) {
    targetMonth += 1;
  }

  // Handle year rollover
  if (targetMonth > 11) {
    targetMonth = targetMonth - 12;
    targetYear += 1;
  }

  return `${months[targetMonth]} ${targetYear}`;
}
