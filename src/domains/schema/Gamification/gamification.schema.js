import { z } from "zod";

export const challengeSchema = z.object({
  name: z.string(),
  description: z.string(), 
  challengeType: z.string(),
  durationSeconds: z.number(),
  courseId: z.number()
});

export const sessionSchema = z.object({
  userId: z.number(),
  challengeId: z.number(),
  score: z.number(),
  timeTaken: z.number(),
  isCompleted: z.boolean(),
});

export const artworkDetailSchema = z.object({
  artist: z.string(),
  period: z.string(),
  year: z.string(),
  artworkId: z.number()
});

export const artworkSchema = z.object({
  image: z.string(),
  title: z.string(),
  challengeId: z.number()
});

export const challengeArraySchema = z.array(challengeSchema);
export const artworkDetailArraySchema = z.array(artworkDetailSchema);
export const artworkArraySchema = z.array(artworkSchema);