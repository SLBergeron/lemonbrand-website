import { LessonData } from "./types";
import { day0 } from "./day-0";
import { day1 } from "./day-1";
import { day2 } from "./day-2";
import { day3 } from "./day-3";
import { day4 } from "./day-4";
import { day5 } from "./day-5";
import { day6 } from "./day-6";
import { day7 } from "./day-7";

export * from "./types";

export const lessons: Record<number, LessonData> = {
  0: day0,
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
};

export function getLesson(day: number): LessonData | undefined {
  return lessons[day];
}
