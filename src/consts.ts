export const SITE_NAME = 'Tingaroo';

/** Shown in the footer of pages that do not pass their own date. */
export const SITE_UPDATED = new Date('2026-11-14');

/** Leave empty until a donation page exists; lesson pages show a placeholder instead. */
export const DONATION_URL = '';

export const GRADE_BANDS = {
  starter: { name: 'Starter', grades: 'Grades 3 to 4', tagClass: 'tag-teal' },
  builder: { name: 'Builder', grades: 'Grades 5 to 6', tagClass: 'tag-orange' },
  maker: { name: 'Maker', grades: 'Grades 7 to 8', tagClass: 'tag-yellow' },
} as const;

export type GradeBand = keyof typeof GRADE_BANDS;

/** Formats dates as "November 14, 2026". Frontmatter dates are UTC midnight, so format in UTC. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
