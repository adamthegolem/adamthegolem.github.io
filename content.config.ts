import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
export enum ApplicationStatus {
  Edit = "edit",
  Pending = "pending",
  Rejected = "rejected",
  Accepted = "accepted",
}
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
        company: z.optional(z.string()),
        individual: z.boolean(),
        tools: z.array(z.string()),
      })
    }),
    projectContent: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    }),
    prints: defineCollection({
      type: 'page',
      source: 'prints/*.md',
      schema: z.object({
        profile: z.string(),
        highlightedSkills: z.array(z.string()),
        url: z.string(),
        company: z.string(),
        date: z.string(),
        status: z.enum(["edit", "pending", "rejected", "accepted"]).default("edit")
      }),
    }),
    companies: defineCollection({
      type: 'data',
      source: 'companies/*.yaml',
      schema: z.object({
        name: z.string(),
        _id: z.string(),
        logo: z.string(),
        description: z.string(),
        website: z.string(),
        location: z.string(),
      })
    })
  }
})