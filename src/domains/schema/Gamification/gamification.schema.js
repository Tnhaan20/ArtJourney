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
  Image: z.any().refine((file) => file instanceof File, {
    message: "Image is required and must be a file",
  }),
  Title: z.string().min(1, "Title is required"),
  ChallengeId: z.number().min(1, "Challenge ID is required"),
});

export const challengeArraySchema = z.array(challengeSchema);
export const artworkDetailArraySchema = z.array(artworkDetailSchema);
