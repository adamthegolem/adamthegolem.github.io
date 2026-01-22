import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.yaml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        start: z.string(),
        end: z.string(),
        icon: z.string(),
        thumbnail: z.string(),
        headline: z.string(),
        skills: z.array(z.string()),
      })
    }),
    projectContent: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    }),
    prints: defineCollection({
      type: 'page',
      source: 'prints/*.md',
    })
  }
})