import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    unit: z.string(),
    lessonNumber: z.number().int().positive(),
    gradeBand: z.enum(['starter', 'builder', 'maker']),
    ageRange: z.string(),
    minutes: z.number().int().positive(),
    materials: z.array(z.string()).min(1),
    updated: z.coerce.date(),
    /** Root-relative path to a file in public/, for example /downloads/unit/lesson.sb3 */
    sb3File: z.string().optional(),
    pdfFile: z.string().optional(),
    /** Drafts render in `npm run dev` only; they are left out of the build and the sitemap. */
    draft: z.boolean().default(false),

    parentHelper: z.object({
      overview: z.string(),
      whenStuck: z.array(z.string()).min(1),
    }),
    lessonPlan: z.object({
      goals: z.array(z.string()).min(1),
      phases: z.array(z.object({
        name: z.string(),
        minutes: z.number().int().positive(),
        activity: z.string(),
      })).min(1),
    }),
    worksheet: z.object({
      prompts: z.array(z.string()).min(1),
      challengeCards: z.array(z.string()).min(1),
    }),
    rubric: z.array(z.object({
      criterion: z.string(),
      lookFor: z.string(),
    })).min(1),
    answerKey: z.array(z.string()).min(1),
    /** Leave empty until each code has been checked against the published standard. */
    standards: z.array(z.object({
      framework: z.string(),
      code: z.string(),
      description: z.string(),
    })).default([]),
  }),
});

export const collections = { lessons };
